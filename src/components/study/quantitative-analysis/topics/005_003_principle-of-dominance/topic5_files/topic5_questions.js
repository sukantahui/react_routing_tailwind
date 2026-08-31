// topic5_questions.js
// 30 Moderate to Expert Questions on Step-by-Step Dominance Reduction Examples

const questions = [
  {
    question: "Reduce the 3x3 game: A = [[3, 2, 4], [4, 5, 6], [2, 1, 3]]. What is the reduced matrix?",
    shortAnswer: "Row 2 [4, 5, 6] strictly dominates Row 3 [2, 1, 3] and Row 1 [3, 2, 4]. Row 2 is the sole surviving row. In Row 2, Col 1 (4) dominates Col 2 (5) and Col 3 (6). Reduced directly to 1x1 saddle point (A2, B1) = ₹4.",
    explanation: "Complete dominance reduction directly to a 1x1 pure saddle point.",
    hint: "Reduces to cell (A2, B1) with value ₹4.",
    level: "moderate",
    codeExample: "A = [[3, 2, 4], [4, 5, 6], [2, 1, 3]] => (A2, B1) = 4;"
  },
  {
    question: "Reduce the 3x3 game: A = [[10, 20, 15], [30, 40, 35], [20, 25, 22]]. What is the reduced matrix and game value?",
    shortAnswer: "Row 2 dominates Row 1 and Row 3 (delete Rows 1 and 3). Col 1 (30) dominates Col 2 (40) and Col 3 (35) (delete Cols 2 and 3). Reduced to 1x1 saddle point (A2, B1) with v* = ₹30,000.",
    explanation: "Row 2 is superior across all columns; Col 1 has lowest payout in Row 2.",
    hint: "Saddle at (A2, B1) with v* = ₹30,000.",
    level: "moderate",
    codeExample: "A = [[10, 20, 15], [30, 40, 35], [20, 25, 22]] => v* = 30000;"
  },
  {
    question: "Reduce the 3x3 game: A = [[2, -1, 3], [3, 2, 4], [-2, 0, 1]]. Which row is eliminated first?",
    shortAnswer: "Row 3 is eliminated first because Row 2 [3, 2, 4] strictly dominates Row 3 [-2, 0, 1] across all 3 columns (3 > -2, 2 > 0, 4 > 1).",
    explanation: "First pass identifies Row 2 > Row 3.",
    hint: "Row 3 is eliminated by Row 2.",
    level: "moderate",
    codeExample: "eliminateRow('A3'); // Row 2 dominates Row 3"
  },
  {
    question: "In the previous 3x3 game, after deleting Row 3, which column is eliminated next from the 2x3 matrix [[2, -1, 3], [3, 2, 4]]?",
    shortAnswer: "Column 3 is eliminated because Column 2 [-1, 2] strictly dominates Column 3 [3, 4] for Player B (-1 < 3 and 2 < 4).",
    explanation: "Column 2 has lower liabilities across both surviving rows than Column 3.",
    hint: "Column 3 is eliminated by Column 2.",
    level: "moderate",
    codeExample: "eliminateCol('B3'); // Col 2 dominates Col 3"
  },
  {
    question: "What is the final reduced 2x2 matrix for the game in the previous two questions?",
    shortAnswer: "A_reduced = [[2, -1], [3, 2]], with surviving rows (A1, A2) and surviving columns (B1, B2).",
    explanation: "Final 2x2 sub-matrix after deleting Row 3 and Column 3.",
    hint: "A_reduced = [[2, -1], [3, 2]].",
    level: "moderate",
    codeExample: "A_reduced = [[2, -1], [3, 2]];"
  },
  {
    question: "In the reduced 2x2 matrix [[2, -1], [3, 2]], does further dominance apply?",
    shortAnswer: "YES! Row 2 [3, 2] strictly dominates Row 1 [2, -1] (3 > 2 and 2 > -1). Then Col 2 (2) dominates Col 1 (3). Final solution is pure saddle point (A2, B2) with v* = ₹2.",
    explanation: "Cascading dominance resolves the entire game to a pure saddle point.",
    hint: "Yes, Row 2 dominates Row 1, leading to saddle point (A2, B2) = ₹2.",
    level: "expert",
    codeExample: "Row2 > Row1 => Col2 < Col1 => (A2, B2) = 2;"
  },
  {
    question: "Suppose a 4x4 matrix is reduced to 2x2 via dominance. How do you verify that the Value of the Game is preserved?",
    shortAnswer: "Calculate Maximin on the original 4x4 and the reduced 2x2; the game value v* will be exactly identical in Indian Rupees (₹).",
    explanation: "Demonstrates invariance of equilibrium value.",
    hint: "Game value v* is identical on original and reduced matrices.",
    level: "intermediate",
    codeExample: "assert(v_star_original === v_star_reduced);"
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a 3x3 casting game and finds that Col 1 = [35, 45, 30] and Col 3 = [50, 60, 40]. Why should Debangshu delete Col 3 for Player B?",
    shortAnswer: "Because Col 3 forces Player B to pay higher payouts across all rows (50 > 35, 60 > 45, 40 > 30). Col 1 dominates Col 3.",
    explanation: "Column 3 is strictly dominated by Column 1.",
    hint: "Col 3 imposes higher payouts in every row; delete Col 3.",
    level: "moderate",
    codeExample: "DebangshuAction = 'Delete Col 3';"
  },
  {
    question: "Can dominance reduction handle matrices with all negative entries?",
    shortAnswer: "YES! Dominance uses standard real number order relations (e.g. -10 > -25). Negative matrices are reduced identically.",
    explanation: "Order preservation applies equally to negative numbers.",
    hint: "Yes, standard inequalities -10 > -25 apply.",
    level: "moderate",
    codeExample: "NegativeDominance: -10 >= -25; // true"
  },
  {
    question: "What is the full strategy vector p* for a 3-row game where Row 1 is deleted and surviving rows A2 and A3 have optimal probabilities 0.7 and 0.3?",
    shortAnswer: "p* = (0, 0.7, 0.3)^T.",
    explanation: "Eliminated row receives 0 probability.",
    hint: "p* = [0, 0.7, 0.3].",
    level: "moderate",
    codeExample: "p_star = [0, 0.7, 0.3];"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating reduced step payoffs and final game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Reduced Game = ₹20,000'"
  },
  {
    question: "What is the ultimate golden rule of Step-by-Step Dominance Reduction Examples?",
    shortAnswer: "'Execute dominance reduction pass-by-pass: prune smaller rows, prune larger columns, re-evaluate cascading dominances, solve the surviving 2x2/1x1 game, and reconstruct the full strategy vectors in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all practical step-by-step reduction steps.",
    hint: "Pass-by-pass reduction → Prune smaller rows, larger cols → Reconstruct full vectors in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: PassByPassReduction() → SolveSubMatrix() → ReconstructFullVectors(₹)."
  }
];

export default questions;
