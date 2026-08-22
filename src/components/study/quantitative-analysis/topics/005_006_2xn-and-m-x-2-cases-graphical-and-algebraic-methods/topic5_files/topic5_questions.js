// topic5_questions.js
// 30 Moderate to Expert Questions on Algebraic Method for 2xn and mx2 Games

const questions = [
  {
    question: "What is the core principle of the Algebraic Method for solving 2xn and mx2 games?",
    shortAnswer: "It systematically evaluates all possible 2x2 submatrices formed by selecting pairs of columns (for 2xn) or pairs of rows (for mx2), solving each algebraically and testing for probability admissibility and global optimality.",
    explanation: "Combinatorial submatrix evaluation principle.",
    hint: "Enumerate all 2x2 submatrices and filter by probability validity and global optimality.",
    level: "moderate",
    codeExample: "solveAlgebraic: enumeratePairs() -> solve2x2() -> filterAdmissible() -> filterGlobalOptimal();"
  },
  {
    question: "How many 2x2 candidate submatrices exist for a 2x4 game?",
    shortAnswer: "C(4, 2) = (4 * 3) / 2 = 6 candidate submatrices.",
    explanation: "Combinatorial calculation C(n, 2).",
    hint: "4 choose 2 = 6 pairs.",
    level: "moderate",
    codeExample: "numCandidates = (4 * 3) / 2; // 6"
  },
  {
    question: "How many 2x2 candidate submatrices exist for a 5x2 game?",
    shortAnswer: "C(5, 2) = (5 * 4) / 2 = 10 candidate submatrices.",
    explanation: "Combinatorial calculation C(m, 2).",
    hint: "5 choose 2 = 10 pairs.",
    level: "moderate",
    codeExample: "numCandidates = (5 * 4) / 2; // 10"
  },
  {
    question: "What are the two mandatory validation criteria for a candidate 2x2 submatrix solution?",
    shortAnswer: "1. Probability Admissibility: 0 <= p1 <= 1 and 0 <= q1 <= 1; 2. Global Optimality: E(p*, Bj) >= v* for all columns j in 2xn (or E(Ai, q*) <= v* for all rows i in mx2).",
    explanation: "The 2 filtration criteria.",
    hint: "Criterion 1: Valid probabilities in [0, 1]; Criterion 2: Global optimality across all original options.",
    level: "expert",
    codeExample: "isValid = isAdmissible(p, q) && isGloballyOptimal(matrix, p, q, v);"
  },
  {
    question: "What does it mean if a candidate 2x2 submatrix yields p1 = 1.25 or q1 = -0.30?",
    shortAnswer: "The candidate submatrix is inadmissible (the lines intersect outside the 1D probability simplex [0, 1]), and it must be discarded immediately.",
    explanation: "Probability range violation rejection.",
    hint: "Discard immediately because probabilities must lie in [0, 1].",
    level: "moderate",
    codeExample: "if (p1 < 0 || p1 > 1 || q1 < 0 || q1 > 1) discard();"
  },
  {
    question: "What does it mean if an admissible submatrix solution yields v* = ₹25,000, but Column 4 yields E(p*, B4) = ₹18,000?",
    shortAnswer: "The solution fails the Global Optimality check: Player B could exploit Player A by playing Column 4 to reduce Player A's payoff to ₹18,000 (< ₹25,000). The candidate is rejected.",
    explanation: "Global minimax condition violation.",
    hint: "Rejected because Player B can exploit Column 4 to lower payoff below v*.",
    level: "expert",
    codeExample: "if (E(p, B4) < v_star) rejectCandidate();"
  },
  {
    question: "How does the Algebraic Method compare to the Graphical Method in execution?",
    shortAnswer: "The Graphical Method visually identifies the single optimal pair directly, while the Algebraic Method enumerates and tests all C(n, 2) pairs computationally without drawing charts.",
    explanation: "Comparison between visual and algebraic approaches.",
    hint: "Graphical identifies the pair visually; algebraic tests all pairs algorithmically.",
    level: "intermediate",
    codeExample: "Graphical: DirectVisualSearch; Algebraic: ExhaustiveCombinatorialFilter;"
  },
  {
    question: "Suppose Debangshu tests pair {B1, B2} on A = [[20, 50, 60, 30], [40, 10, 30, 50]] (in ₹ Thousands). What does he find?",
    shortAnswer: "Δ = -60. p1* = 0.50, q1* = 2/3, q2* = 1/3 (both in [0, 1]). v* = ₹30k. Expected payoffs: B1=30k, B2=30k, B3=45k (>=30k), B4=40k (>=30k). Passed all criteria!",
    explanation: "Algebraic validation trace for pair {B1, B2}.",
    hint: "p1*=0.5, q*=[2/3, 1/3], v*=₹30,000. All global checks passed!",
    level: "expert",
    codeExample: "pair12.isOptimal === true;"
  },
  {
    question: "Why is the Algebraic Submatrix Method easily implemented in software and algorithms?",
    shortAnswer: "Because it relies entirely on simple combinatorial loops and 2x2 matrix determinant formulas, requiring zero computer vision or graphic rendering libraries.",
    explanation: "Algorithmic advantage of the algebraic method.",
    hint: "Simple loops and matrix algebra without graphics rendering.",
    level: "intermediate",
    codeExample: "CombinatorialLoop: for (let i = 0; i < n; i++) for (let j = i+1; j < n; j++) evaluatePair(i, j);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating algebraic game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Audited Game Value = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Algebraic Method for 2xn and mx2 Games?",
    shortAnswer: "'Enumerate all C(n, 2) or C(m, 2) candidate 2x2 submatrices; solve each algebraically; filter out inadmissible probabilities; verify global minimax optimality against all original options; and report the Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all algebraic submatrix evaluation mechanics.",
    hint: "Enumerate pairs -> Solve 2x2 -> Filter admissibility & global optimality in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EnumeratePairs() -> Solve2x2() -> FilterAdmissible() -> FilterGlobalOptimal(₹)."
  }
];

export default questions;
