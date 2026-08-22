// topic1_questions.js
// 30 Moderate to Expert Questions on the Reduction of m x n Games

const questions = [
  {
    question: "What is the systematic 5-phase algorithm for reducing an arbitrary m x n payoff matrix?",
    shortAnswer: "1. Saddle check; 2. Pairwise Row Dominance sweep; 3. Pairwise Column Dominance sweep; 4. Cascading feedback loop (re-test until steady state); 5. Convex combination sweeps if deadlocked.",
    explanation: "Standard Operations Research algorithm for matrix reduction.",
    hint: "Saddle check -> Row sweeps -> Col sweeps -> Feedback loop -> Convex blend.",
    level: "moderate",
    codeExample: "ReductionAlgorithm: CheckSaddle() -> RowSweep() -> ColSweep() -> LoopUntilStable() -> ConvexBlend();"
  },
  {
    question: "Why is a cascading feedback loop necessary during matrix reduction?",
    shortAnswer: "Deleting a column decreases the number of conditions a row must satisfy to dominate another row, often creating newly dominant rows that were not dominant in the original matrix!",
    explanation: "Column deletions alter row dominance relations and vice versa.",
    hint: "Column deletions expose new row dominance relations.",
    level: "expert",
    codeExample: "while (hasChanged) { hasChanged = sweepRows() || sweepCols(); }"
  },
  {
    question: "Suppose a 4x4 matrix is reduced to a 2x2 submatrix involving Rows {A2, A4} and Columns {B1, B3}. If the 2x2 solution is p_sub* = [0.6, 0.4] and q_sub* = [0.7, 0.3], what are the full 4D strategy vectors?",
    shortAnswer: "p* = [0.0, 0.6, 0.0, 0.4]^T and q* = [0.7, 0.0, 0.3, 0.0]^T.",
    explanation: "Eliminated rows and columns receive probability 0.0 in the full vectors.",
    hint: "Map sub-game probabilities to active indices; assign 0.0 to all pruned indices.",
    level: "moderate",
    codeExample: "p_star = [0, 0.6, 0, 0.4]; q_star = [0.7, 0, 0.3, 0];"
  },
  {
    question: "What stopping condition terminates the pure dominance reduction loop?",
    shortAnswer: "When a full iteration of both row and column sweeps yields ZERO deletions (steady-state matrix reached).",
    explanation: "Termination criterion for iterated elimination of strictly dominated strategies.",
    hint: "When no further rows or columns can be deleted.",
    level: "moderate",
    codeExample: "if (deletionsInPass === 0) break;"
  },
  {
    question: "Can an m x n game have multiple distinct surviving 2x2 submatrices if weakly dominated rows are deleted?",
    shortAnswer: "YES! If weak dominance (equality in some cells) is used, different elimination orders may yield different 2x2 submatrices, but they all produce the EXACT SAME Game Value v*.",
    explanation: "Order dependence of weak dominance preserves the unique game value.",
    hint: "Yes, weak dominance order may vary, but game value v* remains identical.",
    level: "expert",
    codeExample: "assert(v_star_pathA === v_star_pathB);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is reducing a 4x3 matrix with entries in ₹ Thousands. In Pass 1, Row 3 is deleted. In Pass 2, Col 2 is deleted. In Pass 3, Row 1 dominates Row 4. What is the final size?",
    shortAnswer: "Starts at 4x3. Pass 1 -> 3x3. Pass 2 -> 3x2. Pass 3 -> 2x2 submatrix!",
    explanation: "Demonstrates cascading dimensional step-down.",
    hint: "4x3 -> 3x3 -> 3x2 -> 2x2.",
    level: "moderate",
    codeExample: "SizeProgression: 4x3 -> 3x3 -> 3x2 -> 2x2."
  },
  {
    question: "What is the primary advantage of reducing an m x n matrix to 2x2 rather than solving the m x n matrix via the Graphical Method?",
    shortAnswer: "A 2x2 matrix can be solved instantaneously via closed-form algebraic formulas (Delta, p*, q*, v*), whereas graphical methods require drawing and finding intersections of n or m lines.",
    explanation: "Closed-form formulas are faster and less prone to manual plotting errors.",
    hint: "Closed-form algebraic formulas are faster and exact.",
    level: "moderate",
    codeExample: "Advantage: InstantClosedFormOverLinePlotting."
  },
  {
    question: "If an m x n matrix has no saddle point and no pure row/column dominance, what is the next analytical reduction technique to attempt?",
    shortAnswer: "Modified Dominance using Convex Combinations (e.g. testing if the 50-50 average of two rows dominates a third row).",
    explanation: "Convex combinations break pure dominance deadlocks.",
    hint: "Test convex combinations / average of rows or columns.",
    level: "intermediate",
    codeExample: "if (noPureDominance) testConvexCombinations();"
  },
  {
    question: "Does deleting a column ever harm Player B (the Column Minimizer)?",
    shortAnswer: "NO! Player B deletes columns with HIGHER payoffs (larger costs/losses), which a rational minimizer would never choose.",
    explanation: "Column elimination discards suboptimal, high-loss actions for Player B.",
    hint: "No, deleting larger columns discards worse options for Player B.",
    level: "moderate",
    codeExample: "assert(deletedColPayoffs >= retainedColPayoffs);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating reduced matrix payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Equilibrium Value = ₹27,142.86'"
  },
  {
    question: "What is the ultimate golden rule of the Reduction of m x n Games?",
    shortAnswer: "'Iteratively sweep rows and columns in cascading passes; prune inferior actions until a 2x2, 2xn, or 1x1 sub-game is reached; map sub-game probabilities back to the full dimension; and report the invariant Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all mechanics of m x n matrix reduction.",
    hint: "Iterative sweeps -> Prune to 2x2/2xn -> Map full vectors -> Report in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: IterativeSweeps() -> PruneSubgame() -> MapFullVectors() -> ReportInRupees(₹)."
  }
];

export default questions;
