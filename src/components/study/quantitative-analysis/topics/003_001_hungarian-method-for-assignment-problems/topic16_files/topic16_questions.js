// topic16_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises in Assignment Problems

const questions = [
  {
    question: "In Numerical Problem 1 (Standard 4x4 Balanced Minimization), what are the 5 sequential steps executed from initial matrix to final cost?",
    shortAnswer: "1. Balance verification (4x4 square); 2. Row reduction (subtract row minimums); 3. Column reduction (subtract column minimums); 4. König line test (L = 4 = n); 5. Box [0] and cross out (X) to extract independent zeros, then sum original rates in Indian Rupees (₹).",
    explanation: "This standard 5-step pipeline is the blueprint for solving all linear assignment exercises.",
    hint: "Balance -> Row Reduce -> Col Reduce -> Line Test -> Assign Zeros -> Sum ₹.",
    level: "moderate",
    codeExample: "NumericalPipeline: CheckBalance -> RowRed -> ColRed -> LineTest -> AssignZeros -> Z_opt."
  },
  {
    question: "In a 3x3 cost matrix C = [[12, 10, 15], [16, 14, 11], [8, 9, 13]], what is the minimum element in Row 1, Row 2, and Row 3?",
    shortAnswer: "Row 1 min = 10; Row 2 min = 11; Row 3 min = 8.",
    explanation: "min(12,10,15)=10; min(16,14,11)=11; min(8,9,13)=8.",
    hint: "10, 11, 8.",
    level: "moderate",
    codeExample: "row_mins = [10, 11, 8]"
  },
  {
    question: "After subtracting these row minimums, what is the resulting Row-Reduced matrix?",
    shortAnswer: "C_row = [[2, 0, 5], [5, 3, 0], [0, 1, 5]].",
    explanation: "R1: [12-10, 10-10, 15-10]=[2, 0, 5]; R2: [16-11, 14-11, 11-11]=[5, 3, 0]; R3: [8-8, 9-8, 13-8]=[0, 1, 5].",
    hint: "[[2, 0, 5], [5, 3, 0], [0, 1, 5]].",
    level: "moderate",
    codeExample: "C_row = [[2, 0, 5], [5, 3, 0], [0, 1, 5]]"
  },
  {
    question: "In C_row above, what are the column minimums v_1, v_2, v_3?",
    shortAnswer: "v_1 = 0, v_2 = 0, v_3 = 0 (every column already contains a zero!).",
    explanation: "Col 1 has 0 at (3,1); Col 2 has 0 at (1,2); Col 3 has 0 at (2,3).",
    hint: "v = [0, 0, 0].",
    level: "moderate",
    codeExample: "col_mins = [0, 0, 0]"
  },
  {
    question: "What is the optimal zero assignment and certified minimum cost Z* for the 3x3 problem above?",
    shortAnswer: "Assignment: (1➔2), (2➔3), (3➔1). Certified Minimum Cost Z* = ₹10 + ₹11 + ₹8 = ₹29.",
    explanation: "10 + 11 + 8 = ₹29.",
    hint: "10 + 11 + 8 = 29.",
    level: "moderate",
    codeExample: "Z_opt = 10 + 11 + 8 = ₹29"
  },
  {
    question: "In Numerical Problem 2 (Unbalanced 3x4 with Prohibited Cell), how many dummy rows must be added, and how is the prohibited cell c_13 configured?",
    shortAnswer: "Add 1 dummy row with ₹0 costs across all 4 columns, and set prohibited cell c_13 = M (Big-M, e.g. ₹99,999).",
    explanation: "4 cols - 3 rows = 1 dummy row; prohibited cell gets M.",
    hint: "Add 1 dummy row (₹0); set c_13 = M.",
    level: "moderate",
    codeExample: "add_dummy_row(cost=0); c_orig[1][3] = Infinity;"
  },
  {
    question: "Suppose in an unbalanced 4x4 augmented problem (3 real rows + 1 dummy row), the optimal matching gives: W1➔J2 (₹14), W2➔J4 (₹18), W3➔J1 (₹16), Dummy➔J3 (₹0). What is the total monetary cost Z* and which job is outsourced?",
    shortAnswer: "Z* = ₹48 ( ₹14 + ₹18 + ₹16 + ₹0 = ₹48 ), and Job 3 is OUTSOURCED to external contractors.",
    explanation: "14 + 18 + 16 + 0 = ₹48. Dummy row paired with Job 3.",
    hint: "Z* = ₹48; Job 3 is outsourced.",
    level: "moderate",
    codeExample: "Z_opt = 14 + 18 + 16 + 0 = ₹48; Outsourced = Job 3."
  },
  {
    question: "In Numerical Problem 3 (Maximization 4x4), the profit matrix has entries ranging from ₹15 to ₹45. What is the first mathematical step?",
    shortAnswer: "Identify M_max = ₹45 and subtract every entry from 45 to construct the Relative Regret Matrix: c_ij = 45 - p_ij.",
    explanation: "Converts maximization to standard Hungarian minimization format.",
    hint: "M_max = 45; Regret C = 45 - P.",
    level: "moderate",
    codeExample: "C_regret = 45 - P."
  },
  {
    question: "After solving the regret matrix, the minimum total regret is Z_regret* = ₹18 for n = 4. What is the maximum total profit Z_max*?",
    shortAnswer: "Z_max* = ₹162 ( n * M_max - Z_regret* = 4 * 45 - 18 = 180 - 18 = ₹162 ).",
    explanation: "4 * 45 - 18 = 162.",
    hint: "4 * 45 - 18 = 162.",
    level: "expert",
    codeExample: "Z_max = 4 * 45 - 18 = ₹162"
  },
  {
    question: "Suppose Debangshu in Barrackpore solves a 5x5 foundry matrix where initial line covering requires L = 3 lines. How many additional reduction iterations might be needed before reaching L = 5?",
    shortAnswer: "Typically 1 or 2 additional reduction iterations (each strictly increasing the dual objective until L = 5).",
    explanation: "Each additional reduction increases line covering count toward n.",
    hint: "1 or 2 iterations.",
    level: "intermediate",
    codeExample: "Iterations count: 1 or 2 until L = 5."
  },
  {
    question: "In a 4x4 matrix, if uncovered elements are [4, 2, 6, 2, 3, 5], what is the value of e, and how are intersection elements modified?",
    shortAnswer: "e = 2 (the minimum uncovered value); intersection elements have 2 ADDED to them ( c_ij' = c_ij + 2 ).",
    explanation: "e = min(4, 2, 6, 2, 3, 5) = 2; intersections += 2.",
    hint: "e = 2; intersections add 2.",
    level: "moderate",
    codeExample: "e = 2; intersections += 2; uncovered -= 2."
  },
  {
    question: "Suppose Susmita in Ichapur has an assignment problem with 2 alternative optimal pairings: Schedule A with cost ₹46 and Schedule B with cost ₹46. How does she verify their equality?",
    shortAnswer: "Both schedules achieve the identical certified minimum sum of original rates in Indian Rupees (₹46) and both satisfy zero duality gap (Z* = W* = 46).",
    explanation: "Zero duality gap confirms both are globally optimal.",
    hint: "Both achieve identical cost ₹46 and satisfy zero duality gap.",
    level: "moderate",
    codeExample: "Z(Schedule_A) === Z(Schedule_B) === ₹46."
  },
  {
    question: "What is the consequence of failing to check if all rows and columns contain zeros before starting the line covering test?",
    shortAnswer: "You will draw incorrect lines on a partially reduced matrix, leading to premature or false line covering counts.",
    explanation: "Both row and column reductions must be complete before testing lines.",
    hint: "Leads to incorrect line covering and invalid solutions.",
    level: "intermediate",
    codeExample: "Prerequisite: Ensure all rows and cols contain >= 1 zero."
  },
  {
    question: "Suppose Mamata in Kolkata solves a 4x4 maximization problem and reports Z* = ₹148 Lakhs. How does she mathematically verify this answer?",
    shortAnswer: "By summing the 4 assigned original profit rates (40 + 40 + 30 + 38 = 148) and verifying that Total Regret (16) equals 4 * 41 - 148 = 16.",
    explanation: "Primal profit matches dual regret equation.",
    hint: "Sum original profits and verify against the regret identity.",
    level: "expert",
    codeExample: "Check: Z_profit === 4 * M_max - Z_regret."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment numerical solutions in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Final Minimum Cost Z* = ₹46'"
  },
  {
    question: "What is the ultimate golden rule of Numerical Assignment Exercises?",
    shortAnswer: "'Classify problem type (balanced/unbalanced/maximization/restricted); apply required pre-processing (dummies/regret); execute 5-step Hungarian solver; pull original rates in Indian Rupees (₹); verify via Strong Duality!'",
    explanation: "This complete rule captures all exam and numerical problem-solving workflows.",
    hint: "Classify -> Pre-process -> Solve Hungarian -> Pull original ₹ rates -> Verify Strong Duality.",
    level: "moderate",
    codeExample: "Golden Rule: Classify -> PreProcess -> SolveHungarian -> PullOrigRates(₹) -> VerifyDuality."
  }
];

export default questions;
