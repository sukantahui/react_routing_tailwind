// topic3_questions.js
// 30 Moderate to Expert Questions on the Modified Dominance Rule (Convex Combination)

const questions = [
  {
    question: "What is the 'Modified Dominance Rule' (Convex Combination Dominance) in Game Theory?",
    shortAnswer: "A generalized dominance principle where a pure strategy is dominated not by another single pure strategy, but by a weighted convex combination (average) of two or more other pure strategies.",
    explanation: "Allows matrix reduction when no single pure strategy dominates another.",
    hint: "Dominance by a weighted average (convex combination) of strategies.",
    level: "moderate",
    codeExample: "isDominatedByAverage = (rowJ, rowI1, rowI2) => (0.5 * rowI1 + 0.5 * rowI2) >= rowJ;"
  },
  {
    question: "What is the mathematical condition for Modified Row Dominance with two rows i1 and i2?",
    shortAnswer: "lambda * a_{i1, k} + (1 - lambda) * a_{i2, k} >= a_{j, k} for ALL columns k, where 0 <= lambda <= 1. Row j is eliminated.",
    explanation: "The weighted average row yields equal or higher payoffs across all columns than Row j.",
    hint: "lambda * Row_i1 + (1 - lambda) * Row_i2 >= Row_j across all cols.",
    level: "moderate",
    codeExample: "ModifiedRowDom: lambda * r1[k] + (1 - lambda) * r2[k] >= rj[k] for all k;"
  },
  {
    question: "What is the mathematical condition for Modified Column Dominance with two columns j1 and j2?",
    shortAnswer: "mu * a_{k, j1} + (1 - mu) * a_{k, j2} <= a_{k, s} for ALL rows k, where 0 <= mu <= 1. Column s is eliminated.",
    explanation: "The weighted average column yields equal or lower liabilities across all rows than Column s.",
    hint: "mu * Col_j1 + (1 - mu) * Col_j2 <= Col_s across all rows.",
    level: "moderate",
    codeExample: "ModifiedColDom: mu * c1[k] + (1 - mu) * c2[k] <= cs[k] for all k;"
  },
  {
    question: "What is the most commonly tested convex weight in textbook examination problems?",
    shortAnswer: "lambda = 0.5 and (1 - lambda) = 0.5 (the simple arithmetic mean of two rows or columns).",
    explanation: "Simple 50-50 average is the standard diagnostic starting point.",
    hint: "Simple arithmetic average (lambda = 0.5).",
    level: "moderate",
    codeExample: "SimpleAverage = (row1[k] + row2[k]) / 2;"
  },
  {
    question: "Suppose Row 1 = [40, 20], Row 2 = [20, 40], and Row 3 = [25, 25]. Does any single row dominate Row 3?",
    shortAnswer: "NO single row dominates Row 3 (40>25 but 20<25; 20<25 but 40>25).",
    explanation: "Pairwise pure dominance fails completely.",
    hint: "No single row dominates Row 3.",
    level: "moderate",
    codeExample: "PureDominance: false;"
  },
  {
    question: "In the previous example, does a CONVEX COMBINATION of Row 1 and Row 2 dominate Row 3?",
    shortAnswer: "YES! Taking the 50-50 average of Row 1 and Row 2 gives: [(40+20)/2, (20+40)/2] = [30, 30]. Since [30, 30] > [25, 25] across both columns, Row 3 is eliminated by modified dominance!",
    explanation: "Convex combination breaks the deadlock and eliminates Row 3.",
    hint: "Yes, the 50-50 average [30, 30] strictly dominates Row 3 [25, 25].",
    level: "expert",
    codeExample: "AverageRow = [30, 30] > [25, 25] => eliminate(Row3);"
  },
  {
    question: "Why is the Modified Dominance Rule called the 'Deadlock Breaker' in Game Theory?",
    shortAnswer: "Because it allows analysts to continue matrix reduction when pure row and column dominance checks stall completely, avoiding the need for full linear programming.",
    explanation: "Solves deadlocked matrices by synthesizing mixed strategies.",
    hint: "It breaks deadlocks when pure dominance fails.",
    level: "intermediate",
    codeExample: "BreakDeadlock: TestConvexCombinations();"
  },
  {
    question: "Suppose Debangshu in Barrackpore is comparing Col 1 [10, 50], Col 2 [50, 10], and Col 3 [35, 35]. Does modified column dominance apply?",
    shortAnswer: "YES! The 50-50 average of Col 1 and Col 2 is [(10+50)/2, (50+10)/2] = [30, 30]. Since [30, 30] <= [35, 35] across both rows, Column 3 is dominated and eliminated for Player B!",
    explanation: "Average column has lower liabilities than Col 3; eliminate Col 3.",
    hint: "Yes, average [30, 30] <= Col 3 [35, 35]; delete Col 3.",
    level: "expert",
    codeExample: "AverageCol = [30, 30] <= [35, 35] => eliminate(Col3);"
  },
  {
    question: "Can modified dominance involve more than two rows or columns (e.g. 3 rows)?",
    shortAnswer: "YES! Any convex combination sum_{i} lambda_i * Row_i with sum lambda_i = 1 and lambda_i >= 0 can be used to dominate an inferior strategy.",
    explanation: "General convex hull dominance principle.",
    hint: "Yes, any convex combination of 3 or more strategies.",
    level: "expert",
    codeExample: "GeneralizedDominance: sum(lambda_i * row_i) >= row_j;"
  },
  {
    question: "Does eliminating a strategy via Modified Dominance preserve the Value of the Game (v*)?",
    shortAnswer: "YES! The Value of the Game v* remains mathematically identical in Indian Rupees (₹).",
    explanation: "Game value invariance theorem holds for all valid dominance reductions.",
    hint: "Yes, v* remains unchanged.",
    level: "moderate",
    codeExample: "v_star_reduced === v_star_original; // true"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating modified dominance payoffs, convex averages, and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Convex Average Payoff = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Modified Dominance Rule in Game Theory?",
    shortAnswer: "'When pure dominance stalls, test convex combinations: if a weighted average of rows exceeds another row, delete the smaller row; if a weighted average of columns is less than another column, delete the larger column in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all convex combination dominance mechanics.",
    hint: "Weighted average >= Row -> delete row; Weighted average <= Col -> delete col in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: TestConvexAverage() -> EliminateDominatedStrategy() -> PreserveGameValue(₹)."
  }
];

export default questions;
