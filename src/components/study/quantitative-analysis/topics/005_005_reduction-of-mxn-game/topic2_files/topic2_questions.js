// topic2_questions.js
// 30 Moderate to Expert Questions on the Use of Dominance for Reduction

const questions = [
  {
    question: "What is the difference between Strict Dominance and Weak Dominance in matrix reduction?",
    shortAnswer: "Strict Dominance requires strict inequalities across all entries (a_ik > a_jk for rows, a_kr < a_ks for cols). Weak Dominance allows equalities in some cells (a_ik >= a_jk or a_kr <= a_ks) provided at least one strict inequality holds.",
    explanation: "Standard distinction between strict and weak dominance.",
    hint: "Strict = strict inequalities; Weak = allows equalities in some cells.",
    level: "moderate",
    codeExample: "isStrictRowDom = rowA.every((val, i) => val > rowB[i]); isWeakRowDom = rowA.every((val, i) => val >= rowB[i]);"
  },
  {
    question: "Does deleting a weakly dominated strategy affect the Game Value v* in Indian Rupees (₹)?",
    shortAnswer: "NO! Deleting a weakly dominated strategy preserves the exact, unique Game Value v*, although it may prune alternative equilibrium strategy mixtures.",
    explanation: "Game value invariance under weak dominance.",
    hint: "No, the game value v* remains strictly unchanged.",
    level: "moderate",
    codeExample: "v_star_after_weak_deletion === v_star_original; // true"
  },
  {
    question: "When should an analyst apply the Modified Dominance Rule (Convex Combinations)?",
    shortAnswer: "When no single pure row dominates another pure row, but a weighted average (convex combination) of two or more rows dominates a third row: lambda*R1 + (1-lambda)*R2 >= R3.",
    explanation: "Used to overcome deadlocks in pure dominance reduction.",
    hint: "When pure dominance fails to reduce the matrix.",
    level: "expert",
    codeExample: "if (!hasPureDominance) testConvexDominance();"
  },
  {
    question: "Suppose Row 1 is [₹40k, ₹10k] and Row 2 is [₹10k, ₹50k]. Does the 50-50 average of Row 1 and Row 2 dominate Row 3 = [₹20k, ₹25k]?",
    shortAnswer: "Average = [ (40+10)/2, (10+50)/2 ] = [₹25k, ₹30k]. Comparing with Row 3: 25 >= 20 and 30 >= 25. YES! Row 3 is dominated and deleted!",
    explanation: "Step-by-step convex combination evaluation.",
    hint: "Average = [25, 30] >= [20, 25] => Row 3 is dominated.",
    level: "moderate",
    codeExample: "avgRow = [25, 30]; assert(avgRow[0] >= 20 && avgRow[1] >= 25);"
  },
  {
    question: "How does convex dominance apply to columns for Player B?",
    shortAnswer: "If a convex combination of two columns has payoffs LESS THAN OR EQUAL to a third column in all rows (mu*C1 + (1-mu)*C2 <= C3), then Column C3 is dominated and deleted.",
    explanation: "Column minimizer deletes larger columns dominated by a convex combination.",
    hint: "Delete C3 if convex combination of C1 and C2 is smaller in all rows.",
    level: "expert",
    codeExample: "if (colBlend.every((val, i) => val <= col3[i])) deleteCol3();"
  },
  {
    question: "Can dominance reduction be applied to non-zero-sum games?",
    shortAnswer: "YES! Iterated elimination of strictly dominated strategies (IESDS) is a fundamental tool for solving general non-zero-sum and bimatrix games.",
    explanation: "General applicability of dominance across all game types.",
    hint: "Yes, IESDS applies to general game theory.",
    level: "intermediate",
    codeExample: "IESDS_Applies: true;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is comparing Row 1 [50, 40] and Row 2 [50, 30]. Which row is deleted?",
    shortAnswer: "Row 1 weakly dominates Row 2 (50 >= 50 and 40 > 30). Row 2 is deleted for Player A (the maximizer).",
    explanation: "Player A keeps the larger row.",
    hint: "Row 2 is deleted because Row 1 provides equal or higher payoffs.",
    level: "moderate",
    codeExample: "deleteRow(2); // Row 1 dominates Row 2"
  },
  {
    question: "Suppose Mamata in Kolkata is comparing Column 1 [30, 20] and Column 2 [30, 40]. Which column is deleted?",
    shortAnswer: "Column 1 weakly dominates Column 2 (30 <= 30 and 20 < 40). Column 2 (the larger cost column) is deleted for Player B (the minimizer).",
    explanation: "Player B deletes the larger column.",
    hint: "Column 2 is deleted because Column 1 provides lower costs.",
    level: "moderate",
    codeExample: "deleteCol(2); // Col 1 dominates Col 2"
  },
  {
    question: "What is the primary advantage of identifying dominance relations before writing exam solutions?",
    shortAnswer: "It instantly prunes zero-probability actions, reduces 4x4 or 3x3 matrices to clean 2x2 calculations, and prevents wasteful algebraic errors.",
    explanation: "Saves time and ensures error-free calculations.",
    hint: "Saves time and eliminates zero-probability strategies.",
    level: "moderate",
    codeExample: "Advantage: InstantDimensionalityReduction."
  },
  {
    question: "Can an optimal mixed strategy assign positive probability to a strictly dominated strategy?",
    shortAnswer: "NEVER! A strictly dominated strategy receives probability 0.0 in every Nash equilibrium.",
    explanation: "Fundamental theorem of strictly dominated strategies.",
    hint: "Never, strictly dominated strategies always receive probability 0.0.",
    level: "moderate",
    codeExample: "assert(p_star[strictlyDominatedIndex] === 0.0);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating reduced matrix payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Dominated Payoff Threshold = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Use of Dominance for Matrix Reduction?",
    shortAnswer: "'Apply strict, weak, and convex dominance to systematically eliminate inferior rows and columns; discard redundant strategies to isolate the active core support; and preserve the invariant Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all dominance reduction principles.",
    hint: "Strict, weak & convex dominance -> Eliminate inferior actions -> Preserve game value in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ApplyDominanceHierarchy() -> PruneInferiorBranches() -> ReportInRupees(₹)."
  }
];

export default questions;
