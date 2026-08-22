// topic6_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_003 Principle of Dominance

const questions = [
  {
    question: "What is the foundational premise of the Principle of Dominance in Game Theory?",
    shortAnswer: "A rational player will never play an inferior (dominated) strategy that yields worse or equal payoffs in all opponent states; eliminating dominated strategies simplifies matrices while preserving the Value of the Game v* in Indian Rupees (₹).",
    explanation: "Rationality axiom dictates elimination of dominated choices.",
    hint: "Rational elimination of inferior strategies while preserving game value v*.",
    level: "moderate",
    codeExample: "Rationality: DeleteDominatedStrategies();"
  },
  {
    question: "What is the Row Dominance rule for Player A (Row Maximizer)?",
    shortAnswer: "If every element in Row i >= Row j (with at least one strict >), Row j is dominated. ELIMINATE THE SMALLER ROW (Row j).",
    explanation: "Player A seeks higher payoffs, so smaller rows are eliminated.",
    hint: "Delete smaller row for Player A.",
    level: "moderate",
    codeExample: "RowRule: if (Row_i >= Row_j) { delete(Row_j); }"
  },
  {
    question: "What is the Column Dominance rule for Player B (Column Minimizer)?",
    shortAnswer: "If every element in Column r <= Column s (with at least one strict <), Column s is dominated. ELIMINATE THE LARGER COLUMN (Column s).",
    explanation: "Player B seeks lower liabilities, so larger columns are eliminated.",
    hint: "Delete larger column for Player B.",
    level: "moderate",
    codeExample: "ColRule: if (Col_r <= Col_s) { delete(Col_s); }"
  },
  {
    question: "What is the difference between Strict Dominance and Weak Dominance?",
    shortAnswer: "Strict dominance requires strictly superior entries everywhere (a_ik > a_jk); weak dominance allows equality in some entries (a_ik >= a_jk with at least one strict >).",
    explanation: "Strict dominance preserves all equilibria; weak dominance preserves at least one.",
    hint: "Strict = strictly > everywhere; Weak = >= everywhere with at least one >.",
    level: "moderate",
    codeExample: "Strict: all(a > b); Weak: all(a >= b) && any(a > b);"
  },
  {
    question: "What is the Modified Dominance Rule and when is it needed?",
    shortAnswer: "When no single pure row or column dominates another, test if a convex combination (weighted average, e.g. 50-50 average) of two strategies dominates a third strategy.",
    explanation: "Breaks matrix reduction deadlocks using synthetic mixed strategies.",
    hint: "Weighted average of strategies dominates a third strategy.",
    level: "expert",
    codeExample: "ModifiedDominance: 0.5 * Row_1 + 0.5 * Row_2 >= Row_3;"
  },
  {
    question: "Why must you re-evaluate rows after deleting columns during iterative reduction?",
    shortAnswer: "Because deleting columns removes opponent actions, which frequently creates NEW row dominances in the trimmed sub-matrix.",
    explanation: "Cascading dominance effect across successive elimination passes.",
    hint: "Deleting columns can create new row dominances.",
    level: "expert",
    codeExample: "CascadingDominance: ColDeletion -> NewRowDominance."
  },
  {
    question: "What probability is assigned to an eliminated dominated strategy in the full strategy vectors p* and q*?",
    shortAnswer: "Exactly ZERO (p_k* = 0.0 or q_k* = 0.0).",
    explanation: "Dominated actions receive zero probability in equilibrium.",
    hint: "Zero probability (0.0).",
    level: "moderate",
    codeExample: "p_star[eliminatedIndex] = 0.0;"
  },
  {
    question: "Does dominance reduction alter the Value of the Game (v*)?",
    shortAnswer: "NO! The Value of the Game v* is strictly identical before and after dominance reduction in Indian Rupees (₹).",
    explanation: "Game value invariance theorem.",
    hint: "No, the game value v* remains unchanged.",
    level: "moderate",
    codeExample: "v_star_reduced === v_star_original; // true"
  },
  {
    question: "How do you handle duplicate identical rows or columns in a payoff matrix?",
    shortAnswer: "Arbitrarily delete one of the duplicate rows or columns (redundant strategy) without affecting the solution space.",
    explanation: "Redundant strategies can be safely pruned.",
    hint: "Delete either one of the duplicates.",
    level: "intermediate",
    codeExample: "if (isDuplicate(r1, r2)) { deleteRow(r2); }"
  },
  {
    question: "What is a 'Dominance-Solvable Game'?",
    shortAnswer: "A game that can be reduced completely to a single 1x1 cell (pure saddle point) via iterative elimination of dominated strategies alone.",
    explanation: "Full resolution achieved via dominance without linear programming or mixed formulas.",
    hint: "A game that reduces completely to a 1x1 saddle point.",
    level: "moderate",
    codeExample: "DominanceSolvable: reducesTo1x1Cell;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating dominance payoffs, security floors, and reduced game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Reduced Game = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of the Principle of Dominance Module?",
    shortAnswer: "'Prune smaller rows for Player A and larger columns for Player B; break deadlocks using convex combinations; cascade reductions to reach 2x2 or 1x1 while preserving the Value of the Game in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all foundational principles of Module 005_003.",
    hint: "Delete smaller rows, larger cols -> Convex combinations for deadlocks -> Preserve game value in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: PruneSmallerRows() -> PruneLargerCols() -> BreakDeadlocks(Convex) -> PreserveVStar(₹)."
  }
];

export default questions;
