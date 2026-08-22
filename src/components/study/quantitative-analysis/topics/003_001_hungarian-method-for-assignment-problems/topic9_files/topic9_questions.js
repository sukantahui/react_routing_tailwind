// topic9_questions.js
// 30 Moderate to Expert Questions on Column Reduction in Assignment Problems

const questions = [
  {
    question: "What is the exact mathematical operation performed during Column Reduction in the Hungarian Method?",
    shortAnswer: "For each column j (from 1 to n) of the row-reduced matrix C', identify the smallest element v_j = min_{i} (c_ij') and subtract v_j from EVERY element down that column: c_ij'' = c_ij' - v_j.",
    explanation: "This guarantees that every row AND every column contains at least one zero.",
    hint: "Identify min in each column of C' and subtract it down that column.",
    level: "moderate",
    codeExample: "for (let j = 0; j < n; j++) { const v_j = Math.min(...C_prime.map(r => r[j])); ... }"
  },
  {
    question: "What happens if Column j ALREADY contains a zero after Row Reduction?",
    shortAnswer: "The column minimum is v_j = 0 (since 0 is the smallest non-negative number); therefore, subtracting v_j = 0 leaves Column j 100% UNCHANGED!",
    explanation: "Column reduction only alters columns that lack a zero.",
    hint: "v_j = 0, so Column j remains unchanged.",
    level: "moderate",
    codeExample: "if (hasZero(col[j])) { v_j = 0; /* No change needed */ }"
  },
  {
    question: "What is the Dual LP interpretation of the subtracted column minimums v_j?",
    shortAnswer: "The column minimums v_j represent the column dual potential variables in the dual objective Max W = Sum u_i + Sum v_j.",
    explanation: "Column reductions raise the dual objective value by Sum v_j.",
    hint: "Column minimums represent dual column potentials v_j.",
    level: "expert",
    codeExample: "Delta W_col = Sum_{j=1}^n v_j."
  },
  {
    question: "Suppose Column 3 of a row-reduced matrix has entries [2, 3, 5, 2]. What is the column minimum, and what is the column after Column Reduction?",
    shortAnswer: "Column minimum is v_3 = 2; after reduction, Column 3 becomes [0, 1, 3, 0].",
    explanation: "[2-2, 3-2, 5-2, 2-2] = [0, 1, 3, 0].",
    hint: "min is 2; [2-2, 3-2, 5-2, 2-2] = [0, 1, 3, 0].",
    level: "moderate",
    codeExample: "col3_reduced = [2-2, 3-2, 5-2, 2-2] = [0, 1, 3, 0]"
  },
  {
    question: "Consider the row-reduced matrix C' = [[0, 5, 2, 8], [1, 0, 2, 4], [3, 2, 5, 0], [0, 2, 4, 3]]. What are the column minimums v_1, v_2, v_3, v_4?",
    shortAnswer: "v_1 = 0, v_2 = 0, v_3 = 2, v_4 = 0.",
    explanation: "Cols 1, 2, 4 have zeros (min = 0); Col 3 has min(2, 2, 5, 4) = 2.",
    hint: "v = [0, 0, 2, 0].",
    level: "moderate",
    codeExample: "col_mins = [0, 0, 2, 0]"
  },
  {
    question: "After subtracting these column minimums, what does Column 3 become in the matrix above?",
    shortAnswer: "Column 3 becomes [0, 0, 3, 2] ( [2-2, 2-2, 5-2, 4-2] = [0, 0, 3, 2] ).",
    explanation: "2-2=0, 2-2=0, 5-2=3, 4-2=2.",
    hint: "[0, 0, 3, 2].",
    level: "moderate",
    codeExample: "col3_reduced = [0, 0, 3, 2]"
  },
  {
    question: "How does the presence of a dummy row of all ₹0 entries affect Column Reduction?",
    shortAnswer: "Every column contains a ₹0 in the dummy row, making all column minimums v_j = 0; thus, Column Reduction is completely bypassed!",
    explanation: "Dummy rows make all column minimums 0.",
    hint: "All column minimums are 0, so column reduction is bypassed.",
    level: "expert",
    codeExample: "if (hasDummyRow) { col_mins = [0]*n; }"
  },
  {
    question: "Can Column Reduction ever destroy existing zeros created during Row Reduction?",
    shortAnswer: "No! Because for any column containing an existing zero, v_j = 0, so subtracting 0 preserves all existing zero entries perfectly.",
    explanation: "Subtracting 0 from 0 leaves 0.",
    hint: "No, columns with zeros have v_j = 0 and remain unchanged.",
    level: "moderate",
    codeExample: "Preservation: 0 - 0 = 0."
  },
  {
    question: "Suppose Debangshu in Barrackpore executes Column Reduction where column minimums are [0, 0, 2, 0]. If the previous dual sum was Sum u_i = ₹45, what is the new total dual sum W?",
    shortAnswer: "W = ₹47 ( ₹45 + (0 + 0 + 2 + 0) = ₹45 + ₹2 = ₹47 ).",
    explanation: "45 + 2 = ₹47.",
    hint: "45 + 2 = 47.",
    level: "moderate",
    codeExample: "W_total = 45 + 2 = ₹47"
  },
  {
    question: "What is the time complexity of performing Column Reduction on an n x n matrix?",
    shortAnswer: "O(n^2) operations (finding column minimums takes n^2 comparisons; subtracting takes n^2 arithmetic steps).",
    explanation: "Iterating through columns takes O(n^2) time.",
    hint: "O(n^2) operations.",
    level: "expert",
    codeExample: "Complexity = O(n^2)."
  },
  {
    question: "Why is it mandatory to perform Row Reduction BEFORE Column Reduction?",
    shortAnswer: "Performing Row Reduction first establishes the primal-dual baseline potentials; performing Column Reduction on the row-reduced matrix ensures only remaining deficit columns are adjusted.",
    explanation: "Standard Hungarian sequence ensures mathematical consistency.",
    hint: "Establishes baseline row potentials first, then adjusts remaining deficit columns.",
    level: "intermediate",
    codeExample: "Step Sequence: Step 2 = RowReduce; Step 3 = ColReduce."
  },
  {
    question: "Suppose Susmita in Ichapur has a 3x3 matrix where all 3 columns already contain zeros after row reduction. What should she do?",
    shortAnswer: "State that v = [0, 0, 0], leave the matrix unchanged, and proceed directly to Step 4 (König's Line Covering Test).",
    explanation: "No column arithmetic is required when all column minimums are 0.",
    hint: "v = [0, 0, 0]; proceed directly to Step 4.",
    level: "moderate",
    codeExample: "v = [0, 0, 0]; proceedToStep4();"
  },
  {
    question: "Suppose Mamata in Kolkata has a column where all entries are Big-M except for one cell: [M, 15, M, M]. What is the column minimum?",
    shortAnswer: "v_j = 15 (ignoring M). After subtraction, that cell becomes 0 and the Big-M cells remain M.",
    explanation: "Infinity minus 15 is still infinity.",
    hint: "v_j = 15; cell becomes 0 and M remains M.",
    level: "expert",
    codeExample: "v_j = min(finite_entries) = 15."
  },
  {
    question: "What guarantees that all matrix entries remain non-negative (>= 0) after Column Reduction?",
    shortAnswer: "Because v_j is the minimum element in Column j (v_j <= c_ij'), subtracting v_j ensures c_ij'' = c_ij' - v_j >= 0 for all i.",
    explanation: "Subtracting the column minimum preserves non-negativity.",
    hint: "Subtracting the minimum guarantees all entries remain >= 0.",
    level: "moderate",
    codeExample: "c_ij' >= v_j => c_ij' - v_j >= 0."
  },
  {
    question: "Suppose Mahima in Barrackpore has a fully reduced matrix after Step 3. What structural property is 100% guaranteed?",
    shortAnswer: "Every single row AND every single column contains at least one zero entry (and all entries are >= 0).",
    explanation: "Row reduction guarantees >= 1 zero per row; column reduction guarantees >= 1 zero per column.",
    hint: "At least one zero in every row and every column.",
    level: "moderate",
    codeExample: "Structural Guarantee: min(Row_i) === 0 and min(Col_j) === 0 for all i, j."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment matrix shifts in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Col Min v_3 = ₹2'"
  },
  {
    question: "What is the ultimate golden rule of Column Reduction?",
    shortAnswer: "'Find min(Col j) in the row-reduced matrix; if min > 0, subtract it down Col j; ensure all entries >= 0 and every row and column has at least one zero; track dual column shift Sum v_j!'",
    explanation: "This complete rule captures all mechanics of Column Reduction.",
    hint: "Find col min -> Subtract if > 0 -> Ensure >= 1 zero per row/col -> Track Sum v_j.",
    level: "moderate",
    codeExample: "Golden Rule: for each col j: v_j = min(col_j); if (v_j > 0) col_j -= v_j; assert all rows/cols have 0."
  }
];

export default questions;
