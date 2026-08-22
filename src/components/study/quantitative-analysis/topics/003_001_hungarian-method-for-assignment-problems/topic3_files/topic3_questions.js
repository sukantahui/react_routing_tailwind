// topic3_questions.js
// 30 Moderate to Expert Questions on the Cost Matrix in Assignment Problems

const questions = [
  {
    question: "What is the Cost Matrix (Effectiveness Matrix) in an Assignment Problem?",
    shortAnswer: "An n x n square matrix where each element c_ij represents the quantifiable cost, time, distance, or penalty incurred by assigning resource i to task j in Indian Rupees (₹) or standard engineering units.",
    explanation: "Rows correspond to assignees (workers, machines, lawyers) and columns correspond to assignments (jobs, delivery routes, legal briefs).",
    hint: "Square matrix of costs c_ij for assigning resource i to task j.",
    level: "moderate",
    codeExample: "C = [[c_11, c_12, ..., c_1n], ..., [c_n1, c_n2, ..., c_nn]]"
  },
  {
    question: "What different operational dimensions can the entries c_ij of a cost matrix represent?",
    shortAnswer: "1. Monetary cost (₹); 2. Labor or machining hours (time minimization); 3. Travel distance in km (fleet routing); 4. Defect/error counts (quality maximization); 5. Negative profits/revenues (sales optimization).",
    explanation: "Any quantifiable performance metric can be modeled as an effectiveness matrix.",
    hint: "Money, time, distance, defect rate, or negative profit.",
    level: "intermediate",
    codeExample: "c_ij in { Rupees (₹), Hours (h), Kilometers (km), Defect Rate (%) }."
  },
  {
    question: "What is the difference between a Symmetric and an Asymmetric Cost Matrix?",
    shortAnswer: "In a Symmetric matrix, c_ij = c_ji for all i, j (e.g. mutual distance between pairs of cities); in an Asymmetric matrix, c_ij != c_ji (e.g. Worker 1 on Job 2 costs differently than Worker 2 on Job 1).",
    explanation: "Most workforce assignment matrices are asymmetric because individual worker skillsets differ across tasks.",
    hint: "Symmetric: c_ij = c_ji; Asymmetric: c_ij != c_ji.",
    level: "moderate",
    codeExample: "Symmetric: C = C^T; Asymmetric: C != C^T."
  },
  {
    question: "How is a 'Restricted (Prohibited) Assignment' represented in a cost matrix?",
    shortAnswer: "By assigning a prohibitively large positive cost M (or Infinity) to that specific matrix entry (c_ij = M).",
    explanation: "Assigning M makes that pairing economically disastrous, forcing the minimization algorithm to select an alternative valid pairing.",
    hint: "Assign a huge penalty cost M (Big-M) or Infinity.",
    level: "moderate",
    codeExample: "Restricted Cell: C[i][j] = Infinity (M >> max(C))."
  },
  {
    question: "Suppose Debangshu in Barrackpore is physically unable to operate Furnace 3 due to heat certification limits. How should cell c_13 be configured?",
    shortAnswer: "Set c_13 = M (where M is a very large penalty number like ₹99,999), ensuring Debangshu is never assigned to Furnace 3.",
    explanation: "The Big-M penalty guarantees zero allocation to cell (1, 3).",
    hint: "Set c_13 = M.",
    level: "moderate",
    codeExample: "c_13 = 99999 (Big-M)."
  },
  {
    question: "What is the Matrix Invariance Property under scalar addition/subtraction in assignment problems?",
    shortAnswer: "Adding or subtracting a constant from every element of any row or column changes the total objective value by a fixed constant, but leaves the OPTIMAL ASSIGNMENT COMBINATION (permutation) 100% unchanged.",
    explanation: "Because sum_j x_ij = 1 and sum_i x_ij = 1, subtracting constants shifts the objective uniformly without changing relative ranking.",
    hint: "Row/column constant shifts preserve optimal assignment permutation.",
    level: "expert",
    codeExample: "Theorem: argmin sum(c_ij * x_ij) === argmin sum((c_ij - u_i - v_j) * x_ij)."
  },
  {
    question: "Suppose Susmita in Ichapur subtracts ₹10 from Row 1 and ₹5 from Row 2 in a 3x3 matrix. If the original optimal cost was ₹80, what is the new optimal cost Z'?",
    shortAnswer: "Z' = ₹65 ( ₹80 - ₹10 - ₹5 = ₹65 ).",
    explanation: "Since exactly one cell is chosen from Row 1 and one from Row 2, total cost drops by 10(1) + 5(1) = ₹15.",
    hint: "80 - 10 - 5 = 65.",
    level: "moderate",
    codeExample: "Z_new = 80 - 10 - 5 = ₹65"
  },
  {
    question: "What is a 'Reduced Cost Matrix' in the context of the Hungarian Method?",
    shortAnswer: "A non-negative matrix obtained by subtracting row minimums and column minimums from the original cost matrix, containing at least one zero in every row and column.",
    explanation: "The zero entries identify cost-optimal assignment candidates.",
    hint: "Matrix of non-negative opportunity costs containing zeros in every row and column.",
    level: "intermediate",
    codeExample: "C_reduced = C - row_min - col_min >= 0."
  },
  {
    question: "Can a cost matrix contain negative numbers (c_ij < 0)?",
    shortAnswer: "Yes, negative entries can represent cost rebates, subsidies, or net profits; they are converted to non-negative form by adding a sufficiently large positive constant K to all matrix elements.",
    explanation: "Adding constant K to all cells shifts total cost by n*K without altering optimal pairings.",
    hint: "Yes; add a positive constant K to make all entries non-negative.",
    level: "expert",
    codeExample: "Negative Entry Fix: C' = C + |min(C)|."
  },
  {
    question: "Suppose Mamata in Kolkata has a cost matrix where all entries in Column 2 are multiplied by 2. Is the optimal assignment guaranteed to remain unchanged?",
    shortAnswer: "No! Multiplying a column by a scalar distorts the relative cost proportions between tasks and can alter the optimal assignment permutation.",
    explanation: "Only linear additions/subtractions preserve permutations; scalar multiplications alter trade-off ratios.",
    hint: "No, scalar multiplication changes relative cost trade-offs.",
    level: "expert",
    codeExample: "Warning: C' = 2 * C_col DOES NOT preserve optimal permutation!"
  },
  {
    question: "What is the primary visual requirement of a cost matrix before starting the Hungarian Method?",
    shortAnswer: "It must be a SQUARE matrix (Number of Rows == Number of Columns == n).",
    explanation: "If rows != cols, dummy lines with ₹0 costs must be added first.",
    hint: "Must be a square n x n matrix.",
    level: "moderate",
    codeExample: "assert C.shape[0] === C.shape[1] (Square Matrix Requirement)."
  },
  {
    question: "In a 3x3 cost matrix C = [[12, 10, 15], [8, 14, 11], [16, 9, 13]], what is the minimum element in Row 1, Row 2, and Row 3?",
    shortAnswer: "Row 1 min = 10; Row 2 min = 8; Row 3 min = 9.",
    explanation: "Row 1: min(12, 10, 15) = 10; Row 2: min(8, 14, 11) = 8; Row 3: min(16, 9, 13) = 9.",
    hint: "Row 1: 10, Row 2: 8, Row 3: 9.",
    level: "moderate",
    codeExample: "row_mins = [10, 8, 9]"
  },
  {
    question: "After subtracting these row minimums from the matrix above, what is the resulting Row-Reduced Matrix?",
    shortAnswer: "C_row_reduced = [[2, 0, 5], [0, 6, 3], [7, 0, 4]].",
    explanation: "Row 1: [12-10, 10-10, 15-10] = [2, 0, 5]; Row 2: [8-8, 14-8, 11-8] = [0, 6, 3]; Row 3: [16-9, 9-9, 13-9] = [7, 0, 4].",
    hint: "Subtract 10 from row 1, 8 from row 2, 9 from row 3.",
    level: "moderate",
    codeExample: "C_row = [[2, 0, 5], [0, 6, 3], [7, 0, 4]]"
  },
  {
    question: "In the Row-Reduced Matrix above, what are the minimum elements in Column 1, Column 2, and Column 3?",
    shortAnswer: "Col 1 min = 0; Col 2 min = 0; Col 3 min = 3.",
    explanation: "Col 1: min(2, 0, 7) = 0; Col 2: min(0, 6, 0) = 0; Col 3: min(5, 3, 4) = 3.",
    hint: "Col 1: 0, Col 2: 0, Col 3: 3.",
    level: "moderate",
    codeExample: "col_mins = [0, 0, 3]"
  },
  {
    question: "After subtracting column minimums, what is the fully reduced matrix?",
    shortAnswer: "C_reduced = [[2, 0, 2], [0, 6, 0], [7, 0, 1]].",
    explanation: "Col 3 becomes [5-3, 3-3, 4-3] = [2, 0, 1]; Cols 1 and 2 remain unchanged.",
    hint: "Col 3 subtracts 3: [2, 0, 2], [0, 6, 0], [7, 0, 1].",
    level: "moderate",
    codeExample: "C_reduced = [[2, 0, 2], [0, 6, 0], [7, 0, 1]]"
  },
  {
    question: "What total baseline cost was subtracted from the original objective by these row and column reductions?",
    shortAnswer: "₹30 ( Row mins sum = 10 + 8 + 9 = 27; Col mins sum = 0 + 0 + 3 = 3; Total = 27 + 3 = ₹30 ).",
    explanation: "Total potential shift = 27 + 3 = ₹30.",
    hint: "27 + 3 = 30.",
    level: "moderate",
    codeExample: "TotalReduction = 10 + 8 + 9 + 3 = ₹30"
  },
  {
    question: "In the fully reduced matrix C_reduced = [[2, 0, 2], [0, 6, 0], [7, 0, 1]], where are the independent zeros?",
    shortAnswer: "Cell (1, 2) in Row 1 [val=0], Cell (2, 3) in Row 2 [val=0], and Cell (2, 1) or alternative zero pairings.",
    explanation: "Pairing (1,2), (2,3), and (3,2) covers 3 independent positions with zero reduced cost.",
    hint: "Independent zeros at (1,2) and (2,3).",
    level: "expert",
    codeExample: "Zeros at: (1,2)=0, (2,1)=0, (2,3)=0, (3,2)=0."
  },
  {
    question: "What is the optimal total cost Z* in the original matrix for assignment (1➔2), (2➔3), (3➔1)?",
    shortAnswer: "₹37 ( c_12 + c_23 + c_31 = 10 + 11 + 16 = ₹37 ).",
    explanation: "Original rates: c_12=10, c_23=11, c_31=16. Total = 10 + 11 + 16 = ₹37.",
    hint: "10 + 11 + 16 = 37.",
    level: "moderate",
    codeExample: "Z_opt = 10 + 11 + 16 = ₹37"
  },
  {
    question: "Suppose Mahima in Barrackpore has a 4x4 matrix where all entries are identical (e.g. c_ij = ₹50 for all i, j). What is the optimal assignment?",
    shortAnswer: "ANY valid permutation matrix is optimal, and all 4! = 24 permutations yield the exact same total cost Z* = 4 x ₹50 = ₹200.",
    explanation: "When effectiveness is uniform across all pairings, all assignments are equally optimal.",
    hint: "All 24 permutations are optimal with cost ₹200.",
    level: "moderate",
    codeExample: "Homogeneous Matrix: All permutations have Z = n * c = 4 * 50 = ₹200."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating matrix costs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee symbol (₹).",
    level: "moderate",
    codeExample: "Report: 'Matrix Unit Rate = ₹50/hr'"
  },
  {
    question: "Suppose Abhronila in Jadavpur wants to optimize a legal research task matrix where entries represent hours spent. How does she report the final objective?",
    shortAnswer: "Report in Total Labor Hours (e.g. Z* = 37 hours), and multiply by the hourly billing rate in Indian Rupees (₹) to get total financial expenditure.",
    explanation: "Cost matrices can represent physical time or direct rupees.",
    hint: "Report in hours, then multiply by hourly rate in ₹.",
    level: "intermediate",
    codeExample: "TotalBill = TotalHours * HourlyRateInRupees"
  },
  {
    question: "How does the cost matrix capture worker specialization in industrial manufacturing?",
    shortAnswer: "By assigning lower costs/times (c_ij) to pairings where a worker has specialized tooling or superior training on that specific machine.",
    explanation: "Variations in c_ij reflect comparative advantage and specialized skills.",
    hint: "Lower costs reflect specialized training and higher productivity.",
    level: "intermediate",
    codeExample: "Specialization: c_ij is small when worker i specializes in machine j."
  },
  {
    question: "Why should an operations manager never normalize a cost matrix by dividing each row by its row sum?",
    shortAnswer: "Because dividing rows by different scalar constants distorts the relative cost trade-offs across the matrix, leading to an incorrect, sub-optimal assignment permutation.",
    explanation: "Division by non-uniform scalars violates the Matrix Invariance Theorem.",
    hint: "Row division distorts cost trade-offs and invalidates the solution.",
    level: "expert",
    codeExample: "Fatal Error: Dividing row i by sum(row_i) destroys cost invariance."
  },
  {
    question: "What is the computational complexity of performing row and column reductions on an n x n cost matrix?",
    shortAnswer: "O(n^2) operations (finding row mins takes n^2 steps, finding col mins takes n^2 steps).",
    explanation: "Iterating through an n x n grid takes O(n^2) time.",
    hint: "O(n^2) operations.",
    level: "expert",
    codeExample: "Complexity = O(n^2) for full initial reduction."
  },
  {
    question: "What is the ultimate golden rule of the Cost Matrix?",
    shortAnswer: "'Ensure the cost matrix is square (n x n); assign M (Big-M) to prohibited pairings; subtract row minimums and column minimums to create the reduced opportunity cost matrix without altering optimal permutations!'",
    explanation: "This complete rule captures all essential handling of the cost matrix in the Hungarian method.",
    hint: "Square matrix -> Big-M for prohibited -> Row/Col minimum subtractions.",
    level: "moderate",
    codeExample: "Golden Rule: Square Matrix + Big-M Penalties + Row/Col Reductions = Reduced Matrix."
  }
];

export default questions;
