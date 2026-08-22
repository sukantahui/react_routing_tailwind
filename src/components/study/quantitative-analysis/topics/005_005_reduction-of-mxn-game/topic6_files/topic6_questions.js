// topic6_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises for mxn Matrix Reduction

const questions = [
  {
    question: "Solve the 4x4 matrix: A = [[30, 40, 20, 50], [40, 50, 10, 60], [20, 30, 10, 40], [10, 20, 10, 30]] (in ₹ Thousands). What is the reduced 2x2 submatrix and game value v*?",
    shortAnswer: "Pass 1: Row 4 deleted by Row 1. Pass 2: Cols 2 & 4 deleted by Col 1 & 3. Pass 3: Row 3 deleted by Row 1. Surviving 2x2: [[30, 20], [40, 10]]. v* = +₹25k (₹25,000).",
    explanation: "Standard 4x4 iterative pure dominance reduction.",
    hint: "Reduces to [[30, 20], [40, 10]], v* = ₹25,000.",
    level: "moderate",
    codeExample: "A_sub = [[30, 20], [40, 10]]; v_star = 25000;"
  },
  {
    question: "Solve the 3x3 matrix: A = [[40, 10, 30], [10, 50, 30], [20, 25, 25]] (in ₹ Thousands). How is it reduced?",
    shortAnswer: "No pure dominance exists. The 50-50 convex average of Row 1 and Row 2 is [25, 30, 30] >= Row 3 [20, 25, 25]. Row 3 is deleted. Then Col 3 is deleted by Col 1. Surviving 2x2: [[40, 10], [10, 50]]. v* = ₹27,142.86.",
    explanation: "Reduction via convex combination dominance.",
    hint: "Row 3 deleted via 50-50 blend of Rows 1 & 2; v* = ₹27,142.86.",
    level: "expert",
    codeExample: "avgRow = [25, 30, 30]; deleteRow(3); v_star = 27142.86;"
  },
  {
    question: "Solve the 4x3 matrix: A = [[30, 10, 40], [20, 5, 25], [10, 40, 50], [5, 30, 20]] (in ₹ Thousands). What is the full 4D strategy vector p*?",
    shortAnswer: "Rows 2 & 4 deleted (dominated by Rows 1 & 3). Col 3 deleted. Surviving 2x2: [[30, 10], [10, 40]]. p_sub* = [0.6, 0.4]. Reconstructed 4D vector: p* = [0.60, 0.00, 0.40, 0.00]^T.",
    explanation: "Reconstructed 4D strategy vector mapping.",
    hint: "p* = [0.6, 0, 0.4, 0]^T.",
    level: "moderate",
    codeExample: "p_star = [0.6, 0, 0.4, 0];"
  },
  {
    question: "Solve the 5x4 matrix: A = [[10, 20, 15, 30], [40, 40, 40, 40], [20, 30, 25, 35], [15, 25, 20, 30], [5, 10, 10, 15]] (in ₹ Thousands). What is the solution?",
    shortAnswer: "Row 2 strictly dominates all other rows (Rows 1, 3, 4, 5 deleted). Matrix reduces to 1x4 with all 40s. Any column gives Game Value v* = +₹40k (₹40,000) directly (Pure Saddle Point!).",
    explanation: "Direct reduction to a 1x1 saddle point.",
    hint: "Row 2 dominates all rows; v* = ₹40,000 (Pure Saddle).",
    level: "moderate",
    codeExample: "v_star = 40000; p_star = [0, 1, 0, 0, 0];"
  },
  {
    question: "In Exercise 1 (4x4 reduction), what are the full 4D vectors p* and q*?",
    shortAnswer: "p* = [0.75, 0.25, 0.00, 0.00]^T and q* = [0.25, 0.00, 0.75, 0.00]^T.",
    explanation: "Full probability distributions for Exercise 1.",
    hint: "p* = [0.75, 0.25, 0, 0], q* = [0.25, 0, 0.75, 0].",
    level: "moderate",
    codeExample: "p_star = [0.75, 0.25, 0, 0]; q_star = [0.25, 0, 0.75, 0];"
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a 3x3 matrix and finds that Col 1 [10, 40, 20] and Col 2 [30, 10, 20] are active. If Col 3 is [40, 50, 30], is Col 3 dominated?",
    shortAnswer: "YES! Col 1 is strictly smaller in rows 1 & 2, and the 50-50 blend of Col 1 & 2 is [20, 25, 20] <= [40, 50, 30] in all rows. Col 3 is dominated and pruned.",
    explanation: "Column convex combination check.",
    hint: "Col 3 is dominated by convex combination of Cols 1 & 2.",
    level: "expert",
    codeExample: "deleteCol(3);"
  },
  {
    question: "How do you verify that the Value of the Game is invariant throughout the 4 reduction exercises?",
    shortAnswer: "By computing the expected payoff under the reconstructed strategy profile (p*, q*) against the original unreduced matrix: E(p*, q*) equals the exact Game Value v* calculated from the reduced submatrix.",
    explanation: "Value invariance verification.",
    hint: "E(p*, q*) on original matrix equals submatrix v*.",
    level: "moderate",
    codeExample: "assert(calcOriginalExpectedPayoff(p_star, q_star) === v_star);"
  },
  {
    question: "What is the computational speedup achieved by reducing a 4x4 matrix to 2x2 compared to solving via 8-variable Simplex LP?",
    shortAnswer: "Reduction takes 3 arithmetic passes (< 10 seconds), whereas Simplex LP requires 4 to 6 large tableau pivots, saving > 90% manual computation time and eliminating algebraic errors.",
    explanation: "Efficiency comparison.",
    hint: "Saves > 90% of manual calculation time.",
    level: "intermediate",
    codeExample: "Speedup: ~10x;"
  },
  {
    question: "Can an m x n matrix with negative payoffs be reduced using dominance?",
    shortAnswer: "YES! The dominance inequalities (a_ik >= a_jk for rows, a_kr <= a_ks for cols) hold identically for positive, zero, and negative numbers.",
    explanation: "Applicability to negative and mixed sign matrices.",
    hint: "Yes, inequalities apply universally across all real numbers.",
    level: "moderate",
    codeExample: "isUniversalAcrossRealNumbers = true;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating numerical reduction exercise solutions in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game = ₹25,000'"
  },
  {
    question: "What is the ultimate golden rule of Numerical Exercises for mxn Matrix Reduction?",
    shortAnswer: "'Trace dominance sweeps stage-by-stage; resolve deadlocks via convex blends; extract the solvable 2x2, 2xn, or 1x1 sub-game; reconstruct full-dimensional strategy vectors; and report all financial payoffs in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all steps in solving numerical m x n matrix reduction problems.",
    hint: "Trace sweeps -> Convex blends -> Extract sub-game -> Reconstruct full vectors in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: TraceSweeps() -> ConvexBlends() -> ExtractSubgame() -> ReportInRupees(₹)."
  }
];

export default questions;
