// topic2_questions.js
// 30 Moderate to Expert Questions on Column Dominance Rules in Game Theory

const questions = [
  {
    question: "What is the exact mathematical condition for Column r to dominate Column s in a Payoff Matrix?",
    shortAnswer: "a_kr <= a_ks for ALL rows k = 1, ..., m, with at least one strict inequality (a_kr < a_ks for some k).",
    explanation: "Every cell in Column r must be less than or equal to the corresponding cell in Column s.",
    hint: "a_kr <= a_ks across all rows k.",
    level: "moderate",
    codeExample: "isColDominant = (c_r, c_s) => c_r.every((val, k) => val <= c_s[k]) && c_r.some((val, k) => val < c_s[k]);"
  },
  {
    question: "When Column r dominates Column s, which column is eliminated from the payoff matrix?",
    shortAnswer: "Column s (the DOMINATED / LARGER column) is eliminated.",
    explanation: "Player B is a minimizer, so the column with larger payout liabilities is deleted.",
    hint: "Delete Column s (larger column).",
    level: "moderate",
    codeExample: "deleteCol(c_s);"
  },
  {
    question: "Why would Player B never choose a dominated column in rational game play?",
    shortAnswer: "Because for every possible row strategy chosen by Player A, the dominating Column r yields an equal or strictly lower payout liability in Indian Rupees (₹) than Column s.",
    explanation: "Rational cost-minimization dictates avoiding dominated actions.",
    hint: "Because Column r imposes lower payout liabilities in all states.",
    level: "moderate",
    codeExample: "RationalChoice: Payout(Col_r) <= Payout(Col_s) for all rows."
  },
  {
    question: "What probability is assigned to an eliminated dominated column in the optimal strategy vector q*?",
    shortAnswer: "q_s* = 0 (exactly zero probability).",
    explanation: "Dominated columns receive zero probability in the equilibrium mixed strategy.",
    hint: "Zero probability (q_s* = 0).",
    level: "moderate",
    codeExample: "q_star[s] = 0.0;"
  },
  {
    question: "Suppose Column 1 = [20, 30, 25] and Column 2 = [25, 35, 30]. Does Column 1 dominate Column 2?",
    shortAnswer: "YES! 20 < 25, 30 < 35, and 25 < 30. Column 1 strictly dominates Column 2, so Column 2 (larger column) is eliminated.",
    explanation: "Column 1 has strictly smaller entries down all rows; delete Column 2.",
    hint: "Yes, Column 1 dominates Column 2; delete Column 2.",
    level: "moderate",
    codeExample: "Col1 = [20, 30, 25], Col2 = [25, 35, 30] => eliminate(Col2);"
  },
  {
    question: "Suppose Column 1 = [20, 45, 25] and Column 2 = [25, 35, 30]. Does Column 1 dominate Column 2?",
    shortAnswer: "NO! Because in Row 2, Column 1 (45) > Column 2 (35). Neither column dominates the other.",
    explanation: "Dominance requires inequality to hold across ALL rows without exception.",
    hint: "No, 45 > 35 in row 2 breaks column dominance.",
    level: "moderate",
    codeExample: "DominanceFailed: 45 > 35;"
  },
  {
    question: "How many pairwise column comparisons are required to test column dominance in an m x n matrix?",
    shortAnswer: "n * (n - 1) / 2 pairwise column comparisons.",
    explanation: "Standard combinatorial pair count for n columns.",
    hint: "n(n - 1) / 2 comparisons.",
    level: "intermediate",
    codeExample: "PairCount = (n * (n - 1)) / 2;"
  },
  {
    question: "Suppose Susmita in Ichapur is comparing Column 1 [₹20k, ₹30k] and Column 2 [₹40k, ₹50k]. Which column should Susmita eliminate for Player B?",
    shortAnswer: "Column 2, because ₹20k < ₹40k and ₹30k < ₹50k; Column 1 strictly dominates Column 2.",
    explanation: "Column 2 represents strictly higher liability; eliminate Column 2.",
    hint: "Eliminate Column 2.",
    level: "moderate",
    codeExample: "SusmitaAction = 'Eliminate Column 2';"
  },
  {
    question: "Can two identical columns (Col 1 == Col 2) exist in a payoff matrix, and how is dominance applied?",
    shortAnswer: "YES! They weakly dominate each other. One of the duplicate columns can be arbitrarily deleted without changing the game value or solution space.",
    explanation: "Duplicate redundant strategies can be safely pruned.",
    hint: "Delete either one of the duplicate columns.",
    level: "intermediate",
    codeExample: "if (isIdentical(col1, col2)) { deleteCol(col2); }"
  },
  {
    question: "Does deleting a dominated column ever change the Minimax liability ceiling (v_upper) for Player B?",
    shortAnswer: "The minimum liability ceiling (Minimax) remains mathematically unchanged (v_upper is invariant), but it removes costly decision paths for Player B.",
    explanation: "Preserves the exact game value while simplifying the matrix.",
    hint: "Liability ceiling v_upper remains unchanged.",
    level: "expert",
    codeExample: "minimax_reduced === minimax_original; // true"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating column payoffs, liability ceilings, and elimination thresholds in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Column Payout Ceiling = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Column Dominance in Game Theory?",
    shortAnswer: "'For Player B (Minimizer), compare columns pairwise: if Column r <= Column s across ALL rows, eliminate the larger Column s; assign probability 0 to the eliminated column while preserving the Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all column dominance mechanics.",
    hint: "Compare pairwise → Column r <= Column s → Delete larger Column s in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CompareColsPairwise() → DeleteLargerCol() → SetProbabilityZero(₹)."
  }
];

export default questions;
