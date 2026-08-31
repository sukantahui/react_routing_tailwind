// topic0_questions.js
// 30 Moderate to Expert Questions on the Principle of Dominance in Game Theory

const questions = [
  {
    question: "What is the formal definition of the 'Principle of Dominance' in Game Theory?",
    shortAnswer: "A simplification principle stating that if one strategy is consistently inferior (yields worse or equal payoffs across all opponent moves) compared to another strategy, the inferior strategy can be deleted from the payoff matrix without altering the optimal value of the game v*.",
    explanation: "Eliminates strictly dominated strategies to reduce matrix dimensions.",
    hint: "Deletion of inferior strategies without changing the game value.",
    level: "moderate",
    codeExample: "if (isDominated(rowA, rowB)) { deleteRow(rowA); }"
  },
  {
    question: "Why is a rational player justified in never playing a strictly dominated strategy?",
    shortAnswer: "Because regardless of what action the opponent chooses, an alternative dominant strategy always yields a strictly higher payoff (for Player A) or strictly lower payout (for Player B).",
    explanation: "Rationality axiom dictates that players maximize expected utility.",
    hint: "Because another strategy is strictly better in every possible scenario.",
    level: "moderate",
    codeExample: "Rationality: NeverPlayStrictlyDominatedStrategy();"
  },
  {
    question: "How does the Dominance Rule differ between Player A (Row Player) and Player B (Column Player)?",
    shortAnswer: "For Player A (Maximizer): Row i dominates Row j if every element in Row i >= Row j (delete the smaller row j). For Player B (Minimizer): Column r dominates Column s if every element in Column r <= Column s (delete the LARGER column s).",
    explanation: "Row player deletes smaller rows; column player deletes larger columns.",
    hint: "Delete SMALLER rows for Player A; delete LARGER columns for Player B.",
    level: "moderate",
    codeExample: "RowRule: deleteIf(r_j <= r_i); ColRule: deleteIf(c_s >= c_r);"
  },
  {
    question: "What is the difference between 'Strict Dominance' and 'Weak Dominance'?",
    shortAnswer: "Strict Dominance requires strictly better payoffs in EVERY cell (a_ik > a_jk for all k). Weak Dominance allows equality in some cells (a_ik >= a_jk for all k, with at least one strict >).",
    explanation: "Strict dominance preserves all Nash equilibria; weak dominance preserves at least one equilibrium.",
    hint: "Strict = strictly > everywhere; Weak = >= everywhere with at least one >.",
    level: "moderate",
    codeExample: "Strict: all(a > b); Weak: all(a >= b) && any(a > b);"
  },
  {
    question: "Does eliminating dominated strategies change the Value of the Game (v*)?",
    shortAnswer: "NO! The Value of the Game v* remains mathematically identical in Indian Rupees (₹) before and after iterative dominance reduction.",
    explanation: "Dominance reduction preserves the invariant game value.",
    hint: "No, the game value v* remains unchanged.",
    level: "moderate",
    codeExample: "v_star_reduced === v_star_original; // true"
  },
  {
    question: "What happens to the optimal probability of a dominated strategy in the final equilibrium vector?",
    shortAnswer: "The optimal probability assigned to any eliminated dominated strategy is exactly ZERO (p_k* = 0 or q_k* = 0).",
    explanation: "Dominated actions receive zero weight in equilibrium.",
    hint: "Probability is zero (p_k* = 0).",
    level: "moderate",
    codeExample: "p_star[dominatedIndex] = 0.0;"
  },
  {
    question: "Can an initially non-dominated strategy become dominated AFTER other rows or columns are deleted?",
    shortAnswer: "YES! This is the core mechanism of 'Iterated Elimination of Dominated Strategies' (IEDS): deleting a column can make a previously non-dominated row become dominated.",
    explanation: "Iterated dominance cascades step-by-step.",
    hint: "Yes, via iterative elimination of dominated strategies (IEDS).",
    level: "expert",
    codeExample: "IteratedDominance: while(canReduce()) { reduce(); }"
  },
  {
    question: "Suppose Debangshu in Barrackpore is comparing Row 1 [₹40k, ₹50k] and Row 2 [₹20k, ₹30k]. Which row should Debangshu eliminate?",
    shortAnswer: "Row 2, because every entry in Row 1 is strictly greater than Row 2 (₹40k > ₹20k and ₹50k > ₹30k).",
    explanation: "Row 1 strictly dominates Row 2; delete Row 2.",
    hint: "Eliminate Row 2 (smaller row).",
    level: "moderate",
    codeExample: "eliminateRow('A2'); // Row 1 dominates Row 2"
  },
  {
    question: "Suppose Susmita in Ichapur is comparing Column 1 [₹30k, ₹40k] and Column 2 [₹50k, ₹60k] for Player B. Which column should Susmita eliminate?",
    shortAnswer: "Column 2, because Column 2 represents higher payout liabilities for Player B across all rows (₹50k > ₹30k and ₹60k > ₹40k).",
    explanation: "Column 1 strictly dominates Column 2; delete the larger Column 2.",
    hint: "Eliminate Column 2 (larger column).",
    level: "moderate",
    codeExample: "eliminateCol('B2'); // Col 1 dominates Col 2"
  },
  {
    question: "Can dominance reduce a large 4x4 matrix all the way down to a single 1x1 saddle point cell?",
    shortAnswer: "YES! If the game is dominance-solvable and strictly determined, iterative elimination of dominated strategies will reduce the matrix directly to the unique saddle point.",
    explanation: "Dominance-solvability leads directly to pure equilibria.",
    hint: "Yes, in dominance-solvable games with a pure saddle point.",
    level: "expert",
    codeExample: "DominanceSolvable: matrix.length === 1 && matrix[0].length === 1;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating dominance payoffs, security floors, and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Dominance Game Value = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of the Principle of Dominance in Game Theory?",
    shortAnswer: "'The Principle of Dominance eliminates inferior choices: delete smaller rows for Player A and larger columns for Player B; this shrinks matrix dimensionality while preserving the exact Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all dominance mechanics.",
    hint: "Delete smaller rows, delete larger columns → Matrix shrinks, game value preserved in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CompareStrategies() → DeleteInferior(SmallerRow, LargerCol) → PreserveVStar(₹)."
  }
];

export default questions;
