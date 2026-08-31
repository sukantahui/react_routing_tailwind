// topic7_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_005 Reduction of mxn Games

const questions = [
  {
    question: "What is the primary motivation for reducing an m x n payoff matrix before solving?",
    shortAnswer: "To eliminate computationally heavy Simplex Linear Programming tableaus, prune structurally inferior actions, isolate the active strategy support, and enable fast 2x2 closed-form or graphical solutions without altering the Game Value v* in Indian Rupees (₹).",
    explanation: "Core purpose of matrix dimensionality reduction in Operations Research.",
    hint: "Avoids complex LP tableaus and isolates the core 2x2/graphical strategy support.",
    level: "moderate",
    codeExample: "target: reduce(m_x_n) → (2x2_ClosedForm || Graphical_2xn_mx2);"
  },
  {
    question: "What are the three possible reduced target architectures for an m x n matrix?",
    shortAnswer: "1. 1x1 cell (Pure Saddle Point); 2. 2x2 submatrix (Closed-form algebraic formulas); 3. 2xn or mx2 submatrix (2D Graphical Envelope method).",
    explanation: "The 3 standard reduction targets.",
    hint: "1x1 (Saddle), 2x2 (Closed-form), or 2xn/mx2 (Graphical).",
    level: "moderate",
    codeExample: "ReductionTargets = ['1x1', '2x2', '2xn', 'mx2'];"
  },
  {
    question: "Why is a cascading feedback loop necessary when reducing an m x n matrix?",
    shortAnswer: "Because deleting a column removes constraints on row comparisons, often revealing newly dominant rows that were NOT dominant in the initial matrix!",
    explanation: "Dynamic nature of iterative dominance sweeps.",
    hint: "Column deletions expose new row dominance relations.",
    level: "expert",
    codeExample: "while (hasChanged) { hasChanged = sweepRows() || sweepCols(); }"
  },
  {
    question: "What is Modified Dominance (Convex Combinations) and when is it used?",
    shortAnswer: "It is used when no pure row or column dominates another, but a weighted blend of two rows (lambda*R1 + (1-lambda)*R2 >= R3) dominates a third row, breaking the deadlock.",
    explanation: "Method to overcome pure dominance deadlocks.",
    hint: "A weighted average of two rows dominates a third row.",
    level: "expert",
    codeExample: "convexBlend = lambda * R1 + (1 - lambda) * R2; if (convexBlend >= R3) deleteR3();"
  },
  {
    question: "In a 2xn game, why do we construct the LOWER Envelope and find the MAXIMIN peak?",
    shortAnswer: "Because Player B minimizes Player A's return, forcing Player A to the lowest expected payoff line. Player A then chooses p1 to maximize this worst-case lower floor.",
    explanation: "Game theoretic foundation of the 2xn graphical method.",
    hint: "Player B minimizes payoff (lower envelope); Player A maximizes return (Maximin peak).",
    level: "expert",
    codeExample: "v_star = max(p1, min_j(E(p1, Bj)));"
  },
  {
    question: "In an mx2 game, why do we construct the UPPER Envelope and find the MINIMAX trough?",
    shortAnswer: "Because Player A maximizes payoff, forcing Player B to pay the highest expected payout line. Player B then chooses q1 to minimize this worst-case upper ceiling.",
    explanation: "Game theoretic foundation of the mx2 graphical method.",
    hint: "Player A maximizes payout (upper envelope); Player B minimizes loss (Minimax trough).",
    level: "expert",
    codeExample: "v_star = min(q1, max_i(E(Ai, q1)));"
  },
  {
    question: "How do you reconstruct the full m-dimensional probability vector p* from a 2x2 sub-game solution?",
    shortAnswer: "Map the sub-game probabilities p_sub* to the surviving row indices, and assign exactly 0.0 to all pruned rows.",
    explanation: "Full-vector reconstruction standard.",
    hint: "Assign sub-game probabilities to active rows; 0.0 to eliminated rows.",
    level: "moderate",
    codeExample: "p_star[activeRows] = p_sub_star; p_star[eliminatedRows] = 0.0;"
  },
  {
    question: "How do you audit global optimality on the original unreduced m x n matrix?",
    shortAnswer: "Verify that E(p*, Bj) >= v* for ALL original columns j, and E(Ai, q*) <= v* for ALL original rows i.",
    explanation: "Global audit check ensuring reduction validity.",
    hint: "E(p*, Bj) >= v* for all columns; E(Ai, q*) <= v* for all rows.",
    level: "expert",
    codeExample: "assert(allCols.every(j => E(p_star, j) >= v_star - 1e-5));"
  },
  {
    question: "What does the strategy support signify in managerial decision-making?",
    shortAnswer: "The support identifies the core operational options that must receive positive budget and staffing, while pruned options represent dead-weight that must be defunded.",
    explanation: "Managerial and financial translation of game solutions.",
    hint: "Support = funded active options; pruned = defunded dead-weight.",
    level: "moderate",
    codeExample: "FundStrategy(supp(p_star)); DefundStrategy(prunedStrategies);"
  },
  {
    question: "Does matrix reduction ever change the Value of the Game v* in Indian Rupees (₹)?",
    shortAnswer: "NEVER! The Value of the Game v* is 100% mathematically invariant under all valid dominance reductions.",
    explanation: "Invariance theorem of game values.",
    hint: "Never, v* is strictly invariant.",
    level: "moderate",
    codeExample: "assert(v_star_reduced === v_star_original);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating matrix payoffs, valuations, and budgets in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game v* = ₹25,000'"
  },
  {
    question: "What is the ultimate golden rule of Module 005_005 Reduction of mxn Games?",
    shortAnswer: "'Iteratively prune large m x n matrices via strict, weak, and convex dominance; extract the solvable 2x2, 2xn, or 1x1 sub-game; reconstruct full-dimensional strategy vectors; verify global optimality; and report all budgets in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all matrix reduction principles.",
    hint: "Prune via dominance → Extract sub-game → Reconstruct full vectors → Audit in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: PruneMatrix() → ExtractSubgame() → ReconstructFullVectors() → GlobalAudit(₹)."
  }
];

export default questions;
