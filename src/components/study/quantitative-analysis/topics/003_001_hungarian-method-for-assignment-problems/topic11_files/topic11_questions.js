// topic11_questions.js
// 30 Moderate to Expert Questions on Making Additional Reductions in Assignment Problems

const questions = [
  {
    question: "When is an Additional Reduction step required in the Hungarian Method?",
    shortAnswer: "When the minimum number of horizontal and vertical lines (L) needed to cover all zeros in the reduced matrix is strictly LESS than the matrix order ( L < n ).",
    explanation: "L < n proves that fewer than n independent zeros exist, requiring matrix modification to generate new zero candidates.",
    hint: "When minimum lines L is strictly less than matrix order n (L < n).",
    level: "moderate",
    codeExample: "if (L < n) { executeAdditionalReduction(); }"
  },
  {
    question: "What is the 3-part transformation protocol during an Additional Reduction step?",
    shortAnswer: "1. Find smallest uncovered element e = min(uncovered); 2. Subtract e from all UNCOVERED elements; 3. Add e to all INTERSECTION elements (covered by 2 lines); 4. Leave SINGLE-COVERED elements (covered by 1 line) completely UNCHANGED.",
    explanation: "This creates new zeros in uncovered cells while preserving dual non-negativity across all other cells.",
    hint: "Subtract e from uncovered, add e to intersections, leave single-covered unchanged.",
    level: "moderate",
    codeExample: "uncovered -= e; intersections += e; single_covered = unchanged."
  },
  {
    question: "How is the adjustment scalar 'e' selected?",
    shortAnswer: "e is the SMALLEST positive number among all elements that are NOT covered by any horizontal line and NOT covered by any vertical line ( e = min_{uncovered}(c_ij) ).",
    explanation: "Selecting the minimum uncovered element guarantees that at least one new zero is created without producing any negative entries.",
    hint: "e is the minimum of all uncovered elements.",
    level: "moderate",
    codeExample: "const e = Math.min(...uncoveredCells);"
  },
  {
    question: "Why do we ADD 'e' to elements at the intersection of two lines?",
    shortAnswer: "Because intersection elements lie on both a covered row and a covered column; adding e compensates for the dual potential shift, preserving dual feasibility (u_i + v_j <= c_ij) without letting reduced costs become negative.",
    explanation: "Maintains exact dual balance at the intersection coordinates.",
    hint: "Compensates for the double-coverage dual shift and preserves non-negativity.",
    level: "expert",
    codeExample: "Intersections: c_ij_new = c_ij + e (preserves dual feasibility)."
  },
  {
    question: "Why do single-covered elements remain completely UNCHANGED during Additional Reduction?",
    shortAnswer: "Because a single-covered element experiences a dual shift of +e from its line which is exactly cancelled by the baseline offset, resulting in a net cost change of exactly zero (+e - e = 0).",
    explanation: "Single line coverage balances the dual potential adjustment perfectly.",
    hint: "Net dual adjustment on single-covered cells is +e - e = 0.",
    level: "expert",
    codeExample: "SingleCovered: Delta c_ij = +e - e = 0 (Unchanged)."
  },
  {
    question: "What is the Dual LP effect of an Additional Reduction step on the dual objective W = Sum u_i + Sum v_j?",
    shortAnswer: "The dual objective function W strictly INCREASES by Delta W = e * (n - L) > 0, driving the duality gap closer to zero.",
    explanation: "Strict monotonic dual ascent guarantees that the Hungarian Method terminates in finite iterations.",
    hint: "Dual objective strictly increases by e * (n - L).",
    level: "expert",
    codeExample: "Delta W = e * (n - L) > 0."
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a 4x4 matrix with L = 3 lines. The uncovered elements are [3, 2, 4, 1, 2, 3]. What is the value of e?",
    shortAnswer: "e = 1 (since 1 is the minimum of [3, 2, 4, 1, 2, 3]).",
    explanation: "min(3, 2, 4, 1, 2, 3) = 1.",
    hint: "e = 1.",
    level: "moderate",
    codeExample: "e = Math.min(3, 2, 4, 1, 2, 3) = 1"
  },
  {
    question: "In Debangshu's problem above (e = 1), what happens to the uncovered cell that had a value of 1?",
    shortAnswer: "It becomes 1 - 1 = 0, creating a BRAND NEW ZERO CANDIDATE in the matrix!",
    explanation: "Subtracting e creates at least one new zero.",
    hint: "1 - 1 = 0 (creates a new zero candidate).",
    level: "moderate",
    codeExample: "new_zero = 1 - 1 = 0."
  },
  {
    question: "In Debangshu's problem above (e = 1), what happens to an intersection cell that had a value of 0?",
    shortAnswer: "It becomes 0 + 1 = 1 (it is no longer a zero candidate).",
    explanation: "Adding e to intersections increases their value.",
    hint: "0 + 1 = 1.",
    level: "moderate",
    codeExample: "intersection_cell = 0 + 1 = 1."
  },
  {
    question: "Can an Additional Reduction step ever create a negative number (c_ij < 0) in the matrix?",
    shortAnswer: "No! Because e is the MINIMUM of all uncovered elements (e <= c_ij for all uncovered), subtracting e produces c_ij - e >= 0; intersections receive +e (increase), and single-covered cells are unchanged.",
    explanation: "All matrix elements remain non-negative (>= 0) at all times.",
    hint: "No, all elements remain >= 0.",
    level: "moderate",
    codeExample: "Non-negativity: forall i, j: c_ij_new >= 0."
  },
  {
    question: "What must be done IMMEDIATELY after completing the Additional Reduction matrix modification?",
    shortAnswer: "Return to Step 4 (Line Covering Test) and re-draw the minimum number of lines L on the modified matrix to test if L = n has now been achieved.",
    explanation: "Re-test line covering on the newly created zero landscape.",
    hint: "Return to Step 4 and re-test line covering.",
    level: "moderate",
    codeExample: "L_new = MinLines(C_modified); if (L_new === n) proceedToStep5();"
  },
  {
    question: "Is it possible for a complex assignment problem to require MULTIPLE additional reduction steps?",
    shortAnswer: "Yes, complex matrices may require 2 or more sequential additional reduction iterations until the minimum line count reaches L = n.",
    explanation: "Each iteration strictly increases W until L = n.",
    hint: "Yes, multiple iterations may be needed until L = n.",
    level: "intermediate",
    codeExample: "while (L < n) { AdditionalReduction(); L = MinLines(); }"
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 matrix with 2 horizontal lines and 1 vertical line (L = 3). How many cells are Uncovered, Single-Covered, and Intersections?",
    shortAnswer: "Uncovered = 6 cells; Single-Covered = 8 cells; Intersections = 2 cells.",
    explanation: "Uncovered = (4-2)*(4-1) = 2*3 = 6; Intersections = 2*1 = 2; Single = 16 - 6 - 2 = 8.",
    hint: "6 uncovered, 8 single, 2 intersections.",
    level: "expert",
    codeExample: "Uncovered = 6; Single = 8; Intersections = 2."
  },
  {
    question: "Suppose Mamata in Kolkata executes an additional reduction with e = ₹3 on a 5x5 matrix with L = 4 lines. What is the total dual increase Delta W?",
    shortAnswer: "Delta W = ₹3 ( e * (n - L) = 3 * (5 - 4) = ₹3 ).",
    explanation: "Delta W = 3 * 1 = ₹3.",
    hint: "3 * (5 - 4) = ₹3.",
    level: "expert",
    codeExample: "Delta W = 3 * (5 - 4) = ₹3"
  },
  {
    question: "What happens if a student accidentally subtracts 'e' from single-covered cells during Step 4b?",
    shortAnswer: "This creates negative numbers, violates dual feasibility, distorts the objective function, and leads to an incorrect assignment solution.",
    explanation: "Single-covered cells MUST remain untouched.",
    hint: "Creates negative numbers and invalidates the solution.",
    level: "intermediate",
    codeExample: "Fatal Error: Subtracting e from single-covered cells."
  },
  {
    question: "What happens if a student forgets to ADD 'e' to intersection cells during Step 4b?",
    shortAnswer: "The dual potential balance is broken, causing the algorithm to loop infinitely or produce a sub-optimal matching.",
    explanation: "Adding e to intersections is essential to maintain mathematical invariance.",
    hint: "Breaks dual balance and may cause infinite cycling.",
    level: "expert",
    codeExample: "Fatal Error: Forgetting to add e to intersections."
  },
  {
    question: "How is a Big-M cell handled if it lies in an UNCOVERED region during Step 4b?",
    shortAnswer: "M is infinity, so M - e remains M (Infinity barrier remains completely intact).",
    explanation: "Infinity minus a finite scalar is still infinity.",
    hint: "M - e = M.",
    level: "moderate",
    codeExample: "M - e = M (Infinity barrier preserved)."
  },
  {
    question: "Suppose Mahima in Barrackpore has completed Step 4b and re-tests the lines, finding that now L = 4 = n. What should she do next?",
    shortAnswer: "Proceed immediately to Step 5: scan rows/cols with 1 zero, make independent assignments [0], and calculate final cost Z* from the ORIGINAL matrix in Indian Rupees (₹).",
    explanation: "L = n signals that the matrix is optimal and ready for zero assignment.",
    hint: "Proceed to Step 5: assign independent zeros.",
    level: "moderate",
    codeExample: "L === n => Step 5: AssignIndependentZeros()."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating additional reduction scalars in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Adjustment Scalar e = ₹1'"
  },
  {
    question: "What is the ultimate golden rule of Making Additional Reductions?",
    shortAnswer: "'If L < n: find smallest uncovered element e; subtract e from uncovered cells; add e to intersection cells; leave single-covered cells unchanged; re-test line covering until L = n!'",
    explanation: "This complete rule captures all logic and mechanics of Step 4b.",
    hint: "If L < n -> e = min(uncovered) -> uncovered - e -> intersections + e -> single unchanged -> re-test.",
    level: "moderate",
    codeExample: "Golden Rule: e = min(uncovered); uncovered -= e; intersections += e; ReTestLines();"
  }
];

export default questions;
