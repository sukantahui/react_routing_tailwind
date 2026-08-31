// topic0_questions.js
// 30 Moderate to Expert Questions on the Need for Reducing Larger Payoff Matrices

const questions = [
  {
    question: "Why is dimensionality reduction essential when analyzing large m x n game matrices?",
    shortAnswer: "Large m x n matrices require complex linear programming Simplex tableaus; reducing matrix size isolates core active strategies and enables fast closed-form algebraic (2x2) or graphical (2xn / mx2) solutions without altering the game value v* in Indian Rupees (₹).",
    explanation: "Eliminates computational overhead and identifies core strategic tensions.",
    hint: "Avoids complex LP tableaus and simplifies solving via 2x2 formulas or graphical methods.",
    level: "moderate",
    codeExample: "reduceComplexity: (m_x_n_SimplexLP) => (2_x_2_ClosedForm);"
  },
  {
    question: "What is the primary mathematical justification that allows analysts to reduce an m x n payoff matrix?",
    shortAnswer: "The Dominance Principle and Support Invariance: Rational players will never play dominated strategies with positive probability, so deleting them preserves all Nash equilibria and the exact Game Value v*.",
    explanation: "Rationality guarantees that zero probability is assigned to dominated moves.",
    hint: "Dominated strategies receive zero probability in equilibrium.",
    level: "moderate",
    codeExample: "Axiom: p_i* = 0 for all dominated strategies."
  },
  {
    question: "What is the computational disadvantage of attempting to solve a 4x4 or 5x5 game directly using Linear Programming without prior reduction?",
    shortAnswer: "It requires setting up dual Linear Programming models with 4 or 5 constraints, requiring multi-iteration Simplex tableaus and artificial variables, which is time-consuming and error-prone.",
    explanation: "Linear programming is computationally heavy compared to 2x2 closed-form formulas.",
    hint: "Requires multi-tableau Simplex iterations and dual LP formulation.",
    level: "intermediate",
    codeExample: "DirectLP: 5_variables + 5_slack_vars + SimplexTableaus."
  },
  {
    question: "What target matrix sizes can an m x n matrix be reduced to for simplified manual solving?",
    shortAnswer: "1. 1x1 cell (Pure Saddle Point); 2. 2x2 submatrix (Closed-form formulas); 3. 2xn or mx2 submatrix (Graphical Method).",
    explanation: "Standard solvable target architectures.",
    hint: "1x1 (Saddle), 2x2 (Algebraic), or 2xn / mx2 (Graphical).",
    level: "moderate",
    codeExample: "TargetDimensions = ['1x1', '2x2', '2xn', 'mx2'];"
  },
  {
    question: "Does reducing a 4x4 matrix to a 2x2 matrix alter the optimal expected payoff to Player A in Indian Rupees (₹)?",
    shortAnswer: "NO! The Value of the Game v* is strictly identical before and after valid dimensionality reduction.",
    explanation: "Value invariance theorem under dominance.",
    hint: "No, the game value v* remains 100% invariant.",
    level: "moderate",
    codeExample: "v_star_reduced === v_star_original; // true"
  },
  {
    question: "Suppose Debangshu in Barrackpore is analyzing a 5x4 alloy bidding matrix with 3 redundant furnace shifts. What is the benefit of pruning them before negotiation?",
    shortAnswer: "Pruning redundant shifts reduces the decision space from 20 cells to a clean 2x2 game (4 cells), allowing instant closed-form probability calculations and locking in ₹35,000 profit.",
    explanation: "Focuses strategic attention on the true competitive trade-offs.",
    hint: "Reduces 20 cells to 4 cells and enables instant calculation.",
    level: "moderate",
    codeExample: "DebangshuAction: Prune3RedundantRows(5x4 => 2x2);"
  },
  {
    question: "What happens if an m x n game cannot be reduced to 2x2 or 1x1 via pure dominance?",
    shortAnswer: "Test Modified Dominance (convex combinations) or reduce to 2xn / mx2 for Graphical Solution, or use Linear Programming if no further reduction is possible.",
    explanation: "Hierarchy of game reduction methods.",
    hint: "Test convex combinations, use graphical method, or solve via Linear Programming.",
    level: "expert",
    codeExample: "FallbackHierarchy: PureDominance → ConvexBlend → Graphical → SimplexLP."
  },
  {
    question: "How does matrix reduction help in identifying the 'Support' of the equilibrium strategy?",
    shortAnswer: "Surviving rows and columns form the exact support of the optimal mixed strategy vectors (supp(p*) and supp(q*)), while eliminated rows and columns receive probability 0.0.",
    explanation: "Isolates the positive probability actions.",
    hint: "Surviving rows/cols form the support; eliminated ones get probability 0.0.",
    level: "expert",
    codeExample: "support_A = survivingRows; support_B = survivingCols;"
  },
  {
    question: "Can an m x n matrix with 10 rows and 10 columns reduce directly to a single 1x1 saddle point?",
    shortAnswer: "YES! If the game is strictly determined and dominance-solvable, iterated elimination will prune 9 rows and 9 columns, leaving a single optimal saddle point.",
    explanation: "Demonstrates dominance-solvability in large matrices.",
    hint: "Yes, in dominance-solvable strictly determined games.",
    level: "moderate",
    codeExample: "reducesDirectlyTo1x1: true;"
  },
  {
    question: "What is the risk of formulating full LP models without first checking for dominance reduction?",
    shortAnswer: "Excessive algebraic overhead, vulnerability to computational rounding errors, and failure to recognize obvious strategic redundancies.",
    explanation: "Operational inefficiency in quantitative decision analysis.",
    hint: "Wastes time on redundant variables and creates algebraic errors.",
    level: "intermediate",
    codeExample: "Risk: WastedSimplexIterationsOnZeroProbabilityVariables."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating matrix payoffs and reduced game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Reduced Matrix Game = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of the Need for Reducing Larger Payoff Matrices?",
    shortAnswer: "'Always prune large m x n matrices before solving: eliminate dominated strategies to isolate the core support, reduce computational complexity to 2x2 or graphical forms, and preserve the exact Value of the Game in Indian Rupees (₹)!'",
    explanation: "This complete rule captures the core motivation of matrix dimensionality reduction.",
    hint: "Prune large matrices → Isolate core support → Solve 2x2/graphical in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: PruneLargeMatrix() → IsolateCoreSupport() → SolveReducedModel(₹)."
  }
];

export default questions;
