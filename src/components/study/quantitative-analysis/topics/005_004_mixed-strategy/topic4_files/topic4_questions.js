// topic4_questions.js
// 30 Moderate to Expert Questions on Determining Optimal Probabilities in Game Theory

const questions = [
  {
    question: "What is the 'Oddments Method' (Rule of Differences) for determining optimal mixed probabilities in a 2x2 game?",
    shortAnswer: "A short-cut arithmetic technique where the magnitude of the difference between elements of Row 2 is placed opposite Row 1, and the difference between Row 1 is placed opposite Row 2, then normalized by the total sum.",
    explanation: "Standard textbook short-cut for finding optimal strategy probabilities without writing algebraic equations.",
    hint: "Row oddments = absolute differences of opposite rows; Col oddments = absolute differences of opposite cols.",
    level: "moderate",
    codeExample: "OddmentA1 = Math.abs(a21 - a22); OddmentA2 = Math.abs(a11 - a12); p1 = OddmentA1 / (OddmentA1 + OddmentA2);"
  },
  {
    question: "How do you calculate the oddments for Player B (Column Player)?",
    shortAnswer: "Oddment for Col 1 = |a12 - a22| (difference of Col 2); Oddment for Col 2 = |a11 - a21| (difference of Col 1); q1* = Oddment_1 / (Oddment_1 + Oddment_2).",
    explanation: "Column oddments are computed from the opposite columns.",
    hint: "Oddment for Col 1 is the difference of Col 2.",
    level: "moderate",
    codeExample: "OddmentB1 = Math.abs(a12 - a22); OddmentB2 = Math.abs(a11 - a21); q1 = OddmentB1 / (OddmentB1 + OddmentB2);"
  },
  {
    question: "When is the Oddments Method valid for solving a 2x2 game?",
    shortAnswer: "ONLY when the 2x2 game has NO saddle point and neither row nor column dominates another.",
    explanation: "Fails if applied to games with saddle points or dominated strategies.",
    hint: "Only valid for 2x2 games without a saddle point.",
    level: "moderate",
    codeExample: "if (hasNoSaddlePoint && hasNoDominance) { useOddments(); }"
  },
  {
    question: "Suppose A = [[40, 10], [10, 50]]. What are the row oddments for Player A?",
    shortAnswer: "Oddment for Row 1 = |10 - 50| = 40. Oddment for Row 2 = |40 - 10| = 30. Total = 70. p1* = 40/70 = 4/7, p2* = 30/70 = 3/7.",
    explanation: "Row 1 gets |Row 2 diff|; Row 2 gets |Row 1 diff|.",
    hint: "Row 1 = 40, Row 2 = 30 => p* = [4/7, 3/7].",
    level: "moderate",
    codeExample: "Row1_odd = Math.abs(10 - 50); // 40; Row2_odd = Math.abs(40 - 10); // 30"
  },
  {
    question: "For A = [[40, 10], [10, 50]], what are the column oddments for Player B?",
    shortAnswer: "Oddment for Col 1 = |10 - 50| = 40. Oddment for Col 2 = |40 - 10| = 30. Total = 70. q1* = 40/70 = 4/7, q2* = 30/70 = 3/7.",
    explanation: "Col 1 gets |Col 2 diff|; Col 2 gets |Col 1 diff|.",
    hint: "Col 1 = 40, Col 2 = 30 => q* = [4/7, 3/7].",
    level: "moderate",
    codeExample: "Col1_odd = Math.abs(10 - 50); // 40; Col2_odd = Math.abs(40 - 10); // 30"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds row oddments of 15 and 35. What is the optimal strategy vector p*?",
    shortAnswer: "Total = 15 + 35 = 50. p1* = 15/50 = 0.30 (30%), p2* = 35/50 = 0.70 (70%). p* = [0.3, 0.7]^T.",
    explanation: "Normalize by dividing by 50.",
    hint: "p* = [0.30, 0.70].",
    level: "moderate",
    codeExample: "p_star = [15 / 50, 35 / 50];"
  },
  {
    question: "How do you verify whether a calculated probability vector p* is indeed the equilibrium strategy?",
    shortAnswer: "Substitute p* into expected payoff equations: E(p*, B1) and E(p*, B2) must be EXACTLY EQUAL in Indian Rupees (₹).",
    explanation: "Verification via the indifference principle.",
    hint: "Verify that E(p*, B1) === E(p*, B2).",
    level: "expert",
    codeExample: "assert(Math.abs(expVsB1 - expVsB2) < 1e-5);"
  },
  {
    question: "What happens to the optimal probabilities p* and q* if every entry in matrix A is multiplied by a positive scalar k > 0?",
    shortAnswer: "The optimal probabilities p* and q* remain 100% UNCHANGED, because scaling matrix entries scales numerator and denominator oddments by k, canceling out.",
    explanation: "Scale invariance of mixed Nash equilibrium probabilities.",
    hint: "Probabilities remain completely unchanged.",
    level: "intermediate",
    codeExample: "p_star_scaled === p_star_original; // true"
  },
  {
    question: "What happens to the optimal probabilities p* and q* if a constant c is added to every entry in matrix A?",
    shortAnswer: "The optimal probabilities p* and q* remain 100% UNCHANGED, because adding c does not change the differences (a22 - a21) or (a11 - a12).",
    explanation: "Shift invariance of mixed Nash equilibrium probabilities.",
    hint: "Probabilities remain completely unchanged.",
    level: "intermediate",
    codeExample: "p_star_shifted === p_star_original; // true"
  },
  {
    question: "Can an optimal probability p1* ever equal 0 or 1 in a game without a saddle point?",
    shortAnswer: "NO! In a strictly non-saddle 2x2 game, the optimal probabilities are strictly interior (0 < p1* < 1 and 0 < q1* < 1).",
    explanation: "Completely mixed strategy property of 2x2 non-saddle games.",
    hint: "No, probabilities are strictly between 0 and 1 (0 < p1* < 1).",
    level: "moderate",
    codeExample: "assert(p1_star > 0 && p1_star < 1);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating payoffs and valuations in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Expected Return = ₹27,142.86'"
  },
  {
    question: "What is the ultimate golden rule of Determining Optimal Probabilities in Game Theory?",
    shortAnswer: "'Use the Oddments Method or Indifference Equations to compute p* and q*: take cross-row and cross-column absolute differences, normalize to sum to 1.0, and verify that expected returns are equalized in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all optimal probability determination mechanics.",
    hint: "Cross-differences -> Normalize to 1.0 -> Verify equalized returns in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CrossDifferences() -> NormalizeSimplex() -> VerifyEqualizedPayoffs(₹)."
  }
];

export default questions;
