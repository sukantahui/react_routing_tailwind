// topic8_questions.js
// 30 Moderate to Expert Questions on Row Reduction in Assignment Problems

const questions = [
  {
    question: "What is the exact mathematical operation performed during Row Reduction in the Hungarian Method?",
    shortAnswer: "For each row i (from 1 to n), identify the smallest element u_i = min_{j} (c_ij) and subtract u_i from EVERY element in that row: c_ij' = c_ij - u_i.",
    explanation: "This creates at least one non-negative zero in every single row while preserving the optimal matching permutation.",
    hint: "Identify min in each row and subtract it from all entries in that row.",
    level: "moderate",
    codeExample: "for (let i = 0; i < n; i++) { const u_i = Math.min(...row[i]); row[i] = row[i].map(c => c - u_i); }"
  },
  {
    question: "Why is every row GUARANTEED to have at least one zero after Row Reduction?",
    shortAnswer: "Because the element that was the minimum in row i (where c_ik = u_i) becomes c_ik' = u_i - u_i = 0 upon subtraction.",
    explanation: "The minimum element subtracted from itself produces exactly 0.",
    hint: "The row minimum subtracted from itself produces 0.",
    level: "moderate",
    codeExample: "c_ik' = c_ik - min(Row_i) = u_i - u_i = 0."
  },
  {
    question: "What is the Dual LP interpretation of the subtracted row minimums u_i?",
    shortAnswer: "The row minimums u_i represent the initial values of the dual row potential variables u_i in the dual objective Max W = Sum u_i + Sum v_j.",
    explanation: "Subtracting u_i shifts the dual lower bound while maintaining u_i <= c_ij.",
    hint: "Row minimums represent dual row potentials u_i.",
    level: "expert",
    codeExample: "Dual LP: u_i = min_{j}(c_ij) ensures u_i + 0 <= c_ij (Dual Feasibility)."
  },
  {
    question: "Suppose Row 1 of a cost matrix is [14, 22, 10, 18]. What is the row minimum, and what is the row after Row Reduction?",
    shortAnswer: "Row minimum is 10; after reduction, Row 1 becomes [4, 12, 0, 8].",
    explanation: "[14-10, 22-10, 10-10, 18-10] = [4, 12, 0, 8].",
    hint: "min is 10; [14-10, 22-10, 10-10, 18-10] = [4, 12, 0, 8].",
    level: "moderate",
    codeExample: "row1_reduced = [14-10, 22-10, 10-10, 18-10] = [4, 12, 0, 8]"
  },
  {
    question: "What happens if a row contains MULTIPLE identical minimum elements (e.g. Row 2 = [15, 12, 18, 12])?",
    shortAnswer: "The minimum is 12, and subtracting 12 produces MULTIPLE zeros in that row: [3, 0, 6, 0] (at cells (2, 2) and (2, 4)).",
    explanation: "Tied minimums create multiple zero candidates in that row.",
    hint: "Produces multiple zeros in that row: [3, 0, 6, 0].",
    level: "moderate",
    codeExample: "row2_reduced = [15-12, 12-12, 18-12, 12-12] = [3, 0, 6, 0]"
  },
  {
    question: "How is a Big-M prohibited cell (e.g. c_13 = M) handled during Row Reduction?",
    shortAnswer: "M is treated as infinity; the row minimum is chosen from the finite numbers (u_i = min_{j != prohibited} c_ij), and M - u_i remains M (unaffected infinity).",
    explanation: "Infinity minus a finite scalar is still infinity.",
    hint: "Ignore M when finding row minimum; M - u_i = M.",
    level: "expert",
    codeExample: "u_i = min(finite_entries); M - u_i = M (Infinity barrier preserved)."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 matrix with a dummy column where c_i,4 = 0 for all rows. What is the row minimum for every row?",
    shortAnswer: "Every row minimum is ₹0 ( u_i = min(..., 0) = 0 ); therefore, Row Reduction leaves the entire matrix 100% unchanged!",
    explanation: "The presence of ₹0 in the dummy column makes all row minimums 0.",
    hint: "Row minimum is 0, so row reduction leaves entries unchanged.",
    level: "expert",
    codeExample: "row_mins = [0, 0, 0, 0] => RowReduction is a no-op."
  },
  {
    question: "Can Row Reduction alone ever be sufficient to reach the optimal solution without column reduction?",
    shortAnswer: "Yes, if the matrix after row reduction happens to have at least one zero in EVERY column AND n independent zeros can be assigned (L = n), column reduction can be bypassed.",
    explanation: "If every column already contains a zero, column minimums are all 0.",
    hint: "Yes, if every column already contains at least one zero.",
    level: "intermediate",
    codeExample: "if (all_cols_have_zero) { col_mins = [0]*n; proceedToLineCovering(); }"
  },
  {
    question: "Suppose Debangshu in Barrackpore executes Row Reduction on a 3x3 matrix with row minimums [8, 14, 11]. What total cost was subtracted from the objective function?",
    shortAnswer: "₹33 ( 8 + 14 + 11 = ₹33 ).",
    explanation: "Total potential shift = 8 + 14 + 11 = ₹33.",
    hint: "8 + 14 + 11 = 33.",
    level: "moderate",
    codeExample: "TotalRowShift = 8 + 14 + 11 = ₹33"
  },
  {
    question: "Can any entry in a row become negative after Row Reduction?",
    shortAnswer: "No, because we subtract the MINIMUM element u_i from all elements c_ij, and since c_ij >= u_i for all j, c_ij - u_i >= 0 (all entries are non-negative).",
    explanation: "Subtracting the minimum guarantees non-negativity.",
    hint: "No; subtracting the minimum ensures all entries are >= 0.",
    level: "moderate",
    codeExample: "forall j: c_ij >= min(Row_i) => c_ij - min(Row_i) >= 0."
  },
  {
    question: "What is the time complexity of performing Row Reduction on an n x n matrix?",
    shortAnswer: "O(n^2) operations (finding row minimums takes n^2 comparisons; subtracting takes n^2 arithmetic steps).",
    explanation: "Iterating through an n x n grid takes O(n^2) time.",
    hint: "O(n^2) operations.",
    level: "expert",
    codeExample: "Complexity = O(n^2)."
  },
  {
    question: "Suppose Mamata in Kolkata has a 3x3 matrix: Row 1 = [10, 15, 20], Row 2 = [12, 10, 18], Row 3 = [15, 14, 11]. What are the row minimums?",
    shortAnswer: "Row 1 min = 10; Row 2 min = 10; Row 3 min = 11.",
    explanation: "min(10,15,20)=10; min(12,10,18)=10; min(15,14,11)=11.",
    hint: "10, 10, 11.",
    level: "moderate",
    codeExample: "row_mins = [10, 10, 11]"
  },
  {
    question: "What is the matrix after Row Reduction for Mamata's problem above?",
    shortAnswer: "C_row = [[0, 5, 10], [2, 0, 8], [4, 3, 0]].",
    explanation: "R1: [0, 5, 10]; R2: [2, 0, 8]; R3: [4, 3, 0].",
    hint: "[[0, 5, 10], [2, 0, 8], [4, 3, 0]].",
    level: "moderate",
    codeExample: "C_row = [[0, 5, 10], [2, 0, 8], [4, 3, 0]]"
  },
  {
    question: "In Mamata's matrix above, does every column contain at least one zero after Row Reduction?",
    shortAnswer: "Yes! Col 1 has 0 at (1,1); Col 2 has 0 at (2,2); Col 3 has 0 at (3,3). Column reduction is completely unnecessary (all col mins = 0)!",
    explanation: "All 3 columns have zeros, so column minimums are all 0.",
    hint: "Yes, every column has a zero, so column reduction is bypassed.",
    level: "moderate",
    codeExample: "col_mins = [0, 0, 0] => Ready for Step 4."
  },
  {
    question: "What is the optimal total cost Z* in Mamata's original matrix for assignment (1➔1), (2➔2), (3➔3)?",
    shortAnswer: "₹31 ( c_11 + c_22 + c_33 = 10 + 10 + 11 = ₹31 ).",
    explanation: "10 + 10 + 11 = ₹31.",
    hint: "10 + 10 + 11 = 31.",
    level: "moderate",
    codeExample: "Z_opt = 10 + 10 + 11 = ₹31"
  },
  {
    question: "Why should an operations researcher NEVER subtract column minimums BEFORE row minimums in standard Hungarian execution?",
    shortAnswer: "While mathematically valid, standard academic and textbook conventions require Row Reduction first, followed by Column Reduction, to maintain uniformity in working steps and grading keys.",
    explanation: "Row reduction first is the universally accepted standard.",
    hint: "Standard convention is Row Reduction first, then Column Reduction.",
    level: "intermediate",
    codeExample: "Convention: Step 2 = RowReduce; Step 3 = ColReduce."
  },
  {
    question: "Suppose Mahima in Barrackpore has a row with all identical numbers: [25, 25, 25, 25]. What does this row become after Row Reduction?",
    shortAnswer: "A row of all zeros: [0, 0, 0, 0] (since 25 - 25 = 0 for all cells).",
    explanation: "Subtracting 25 makes every element 0.",
    hint: "[0, 0, 0, 0].",
    level: "moderate",
    codeExample: "row_reduced = [0, 0, 0, 0]"
  },
  {
    question: "What does a row of all zeros physically represent in an assignment model?",
    shortAnswer: "It means that the worker associated with that row performs equally well across all available tasks, offering maximum assignment flexibility.",
    explanation: "Zero opportunity cost variance across all jobs.",
    hint: "Worker has identical performance and flexibility across all tasks.",
    level: "intermediate",
    codeExample: "Operational Meaning: Uniform worker competency across all tasks."
  },
  {
    question: "What currency symbol must ALWAYS be used when reporting matrix costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Row Min u_1 = ₹10'"
  },
  {
    question: "What is the ultimate golden rule of Row Reduction?",
    shortAnswer: "'Find min(Row i); subtract it from every entry in Row i (ignoring Big-M); ensure all entries are non-negative with at least one zero per row; track total row potential shift Sum u_i!'",
    explanation: "This complete rule captures all mechanics of Row Reduction.",
    hint: "Find row min -> Subtract from row -> Ensure non-negative with >= 1 zero -> Track Sum u_i.",
    level: "moderate",
    codeExample: "Golden Rule: for each row i: u_i = min(row_i); row_i -= u_i; assert min(row_i) === 0."
  }
];

export default questions;
