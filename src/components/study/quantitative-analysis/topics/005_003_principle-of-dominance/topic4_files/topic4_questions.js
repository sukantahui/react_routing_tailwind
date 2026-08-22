// topic4_questions.js
// 30 Moderate to Expert Questions on Reducing Matrix Size Using Dominance

const questions = [
  {
    question: "What is the primary operational objective of reducing matrix size using dominance in Game Theory?",
    shortAnswer: "To shrink large, intractable m x n payoff matrices down to compact 2x2 games (solvable via simple algebraic formulas) or 1x1 saddle points without altering the optimal game value v*.",
    explanation: "Reduces computational complexity and simplifies game resolution.",
    hint: "Shrink large matrices down to solvable 2x2 or 1x1 games in ₹.",
    level: "moderate",
    codeExample: "reduceMatrix: (m_x_n) => (2_x_2_or_1_x_1);"
  },
  {
    question: "What are the 4 sequential passes in the Multi-Pass Iterative Elimination Algorithm?",
    shortAnswer: "Pass 1: Scan and delete dominated rows; Pass 2: Scan and delete dominated columns; Pass 3: Re-evaluate rows in the reduced matrix; Pass 4: Apply modified dominance if pure dominance stalls.",
    explanation: "Standard iterative dominance algorithm.",
    hint: "Rows -> Columns -> Re-evaluate Rows -> Modified dominance.",
    level: "moderate",
    codeExample: "while(canReduce()) { deleteDominatedRows(); deleteDominatedCols(); testConvex(); }"
  },
  {
    question: "Why must rows be re-inspected AFTER columns are deleted in Pass 2?",
    shortAnswer: "Because deleting a column eliminates opponent options, which may cause a previously non-dominated row to become strictly dominant in the newly trimmed matrix.",
    explanation: "Dimensionality reduction cascades and creates new dominance relations.",
    hint: "Deleting columns can create new row dominances.",
    level: "expert",
    codeExample: "CascadingDominance: colDeletion -> newRowDominance."
  },
  {
    question: "When does the iterative dominance reduction process TERMINATE?",
    shortAnswer: "When either: 1. A 1x1 saddle point is reached; 2. A 2x2 irreducible matrix is reached; 3. No further pure or modified dominance can be found.",
    explanation: "Standard stopping conditions for iterative dominance.",
    hint: "Terminates at 1x1, 2x2, or when no further dominance exists.",
    level: "moderate",
    codeExample: "isTerminated: matrix.length <= 2 && matrix[0].length <= 2;"
  },
  {
    question: "How are the probabilities for the original full-sized strategy vector constructed from the reduced 2x2 solution?",
    shortAnswer: "Assign the calculated probabilities (p1*, p2*) and (q1*, q2*) to the surviving rows and columns, and assign probability 0.0 to all previously eliminated rows and columns.",
    explanation: "Reconstruction of full equilibrium mixed strategy vectors.",
    hint: "Assign 0 to eliminated strategies; assign calculated weights to surviving ones.",
    level: "moderate",
    codeExample: "FullVectorP = survivingIndices.map(idx => (idx in reduced ? p_reduced[idx] : 0.0));"
  },
  {
    question: "Suppose a 4x4 matrix is reduced to a 2x2 matrix with optimal row probabilities p = [0.6, 0.4] for surviving rows A2 and A4. What is the full 4-dimensional strategy vector p*?",
    shortAnswer: "p* = (0, 0.6, 0, 0.4)^T.",
    explanation: "Zeros placed on deleted rows A1 and A3.",
    hint: "p* = [0, 0.6, 0, 0.4].",
    level: "moderate",
    codeExample: "p_star = [0, 0.6, 0, 0.4];"
  },
  {
    question: "Can dominance reduce a 3x3 matrix directly to a single 1x1 cell?",
    shortAnswer: "YES! If the game is dominance-solvable and possesses a pure saddle point, dominance will iteratively prune all rows and columns until only the 1x1 saddle point remains.",
    explanation: "Demonstrates dominance-solvability in strictly determined games.",
    hint: "Yes, in strictly determined dominance-solvable games.",
    level: "moderate",
    codeExample: "reducedMatrix = [[v_star]];"
  },
  {
    question: "Suppose Debangshu in Barrackpore reduces a 3x3 casting tender to a 2x2 matrix and solves it to find v* = ₹35,000. What is the value of the ORIGINAL 3x3 game?",
    shortAnswer: "Exactly v* = ₹35,000; the Value of the Game is strictly invariant under all dominance reductions.",
    explanation: "Game value invariance theorem.",
    hint: "Exactly ₹35,000 (value is preserved).",
    level: "moderate",
    codeExample: "v_star_original = v_star_reduced = 35000;"
  },
  {
    question: "What should you do if a 4x3 matrix is reduced to a 2x3 matrix and no further dominance can be applied?",
    shortAnswer: "Solve the remaining 2x3 game using the Graphical Method (or sub-game 2x2 method / Linear Programming).",
    explanation: "Transitions from dominance reduction to graphical solution.",
    hint: "Use the Graphical Method on the surviving 2x3 matrix.",
    level: "expert",
    codeExample: "NextStep: SolveViaGraphicalMethod(2x3);"
  },
  {
    question: "What is the computational speedup achieved by reducing a 4x4 matrix to a 2x2 matrix?",
    shortAnswer: "Solving a 2x2 matrix requires simple 2-variable arithmetic formulas, avoiding 4-variable Simplex linear programming tableau iterations.",
    explanation: "Massive reduction in algebraic overhead.",
    hint: "Avoids complex LP Simplex tableaus by reducing to closed-form 2x2 formulas.",
    level: "intermediate",
    codeExample: "Speedup: ClosedForm2x2 vs 4VarSimplexLP."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating reduced matrix payoffs and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Reduced Game Value = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of Matrix Size Reduction Using Dominance?",
    shortAnswer: "'Iteratively prune dominated rows and columns in multi-pass cycles; re-inspect after every deletion; reduce large matrices to 2x2 or 1x1 while preserving the exact Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all matrix reduction mechanics.",
    hint: "Prune rows and cols iteratively -> Re-inspect -> Solve compact 2x2 in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: IterativePruning() -> ReInspectSubMatrix() -> Solve2x2Reduced(₹)."
  }
];

export default questions;
