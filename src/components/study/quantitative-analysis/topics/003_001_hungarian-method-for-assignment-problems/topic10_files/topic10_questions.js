// topic10_questions.js
// 30 Moderate to Expert Questions on Covering Zeros in Assignment Problems

const questions = [
  {
    question: "What is the purpose of Covering Zeros in the Hungarian Method?",
    shortAnswer: "To determine the minimum number of horizontal and vertical lines (L) needed to cover all zero entries in the reduced matrix, testing whether an optimal one-to-one assignment of size n is currently achievable.",
    explanation: "By König's Theorem, if L = n, an optimal assignment exists; if L < n, additional reductions are required.",
    hint: "Tests whether the minimum lines L equals matrix order n.",
    level: "moderate",
    codeExample: "L = MinLinesCoveringAllZeros(C_reduced); isOptimal = (L === n);"
  },
  {
    question: "What is Kőnig's Theorem (1931) on Line Covering?",
    shortAnswer: "In any bipartite graph or binary matrix, the minimum number of lines (horizontal rows and vertical columns) required to cover all zeros EQUALS the maximum number of independent zeros (maximum matching).",
    explanation: "Min Vertex Cover = Max Bipartite Matching.",
    hint: "Min lines to cover all zeros equals max independent zeros.",
    level: "expert",
    codeExample: "König's Theorem: MinLines(Zeros) === MaxIndependentMatching."
  },
  {
    question: "What does it mean if the minimum number of lines L equals the matrix order n ( L = n )?",
    shortAnswer: "It means that the reduced matrix contains n independent zeros (one in each row and column), certifying that a globally optimal assignment permutation is achievable.",
    explanation: "L = n signals that the algorithm can proceed directly to zero assignment.",
    hint: "L = n means optimal assignment is reached.",
    level: "moderate",
    codeExample: "if (L === n) { proceedToStep5_AssignZeros(); }"
  },
  {
    question: "What does it mean if the minimum number of lines L is strictly less than the matrix order ( L < n )?",
    shortAnswer: "It means that fewer than n independent zeros exist, so a full 1-to-1 assignment cannot be formed yet; an additional reduction step must be performed.",
    explanation: "L < n requires adjusting uncovered elements by e.",
    hint: "L < n means not optimal yet; additional reduction needed.",
    level: "moderate",
    codeExample: "if (L < n) { performAdditionalReduction(); }"
  },
  {
    question: "What is the formal systematic tick-marking algorithm for drawing the minimum number of lines?",
    shortAnswer: "1. Mark (✓) all rows with NO assigned zero; 2. For each marked row, mark columns with a zero in that row; 3. For each marked column, mark rows with an assigned zero in that column; 4. Draw lines through UNMARKED ROWS and MARKED COLUMNS.",
    explanation: "This graph-theoretic protocol guarantees the absolute minimum number of covering lines.",
    hint: "Mark rows with no assigned zero -> mark cols -> mark rows -> draw lines through unmarked rows and marked cols.",
    level: "expert",
    codeExample: "DrawLines: through UnmarkedRows and MarkedColumns."
  },
  {
    question: "Why do we draw lines through UNMARKED rows and MARKED columns instead of marked rows?",
    shortAnswer: "Because unmarked rows contain all the assigned zeros not reachable via alternating zero paths, while marked columns cover all the alternative zero paths emanating from uncovered rows.",
    explanation: "This dual minimum vertex cover formulation covers every zero with the fewest possible lines.",
    hint: "Covers all zeros using the minimal vertex cover of the bipartite graph.",
    level: "expert",
    codeExample: "MinimalVertexCover = UnmarkedRows union MarkedCols."
  },
  {
    question: "Suppose Debangshu in Barrackpore is solving a 4x4 matrix. Can he cover all zeros using 5 lines?",
    shortAnswer: "While 5 lines would cover all zeros, it violates the MINIMALITY rule; the goal is to find the SMALLEST possible number of lines L <= 4.",
    explanation: "Any n lines (e.g. all 4 rows) covers all zeros, but we must find the MINIMUM lines L.",
    hint: "Must find the MINIMUM number of lines, not just any covering.",
    level: "moderate",
    codeExample: "L = MINIMUM lines covering all zeros."
  },
  {
    question: "In a 3x3 matrix where zeros are at (1,1), (1,2), (1,3), and (2,2), what is the minimum number of lines to cover all zeros?",
    shortAnswer: "2 lines (Line 1 horizontally through Row 1, Line 2 vertically through Column 2).",
    explanation: "Row 1 covers (1,1), (1,2), (1,3); Col 2 covers (2,2). Total lines = 2.",
    hint: "Row 1 and Column 2 (2 lines).",
    level: "moderate",
    codeExample: "Lines: [Row 1, Col 2] => L = 2 < 3."
  },
  {
    question: "In the 3x3 problem above with L = 2 < 3, is the matrix optimal?",
    shortAnswer: "No, because L = 2 is strictly less than matrix order n = 3; an additional reduction is required.",
    explanation: "2 lines cannot produce 3 independent zeros.",
    hint: "No, L = 2 < 3.",
    level: "moderate",
    codeExample: "L = 2 < 3 => Additional Reduction Required."
  },
  {
    question: "Suppose Susmita in Ichapur has a 4x4 matrix where all 4 diagonal entries (1,1), (2,2), (3,3), (4,4) are zeros and all other entries are positive. How many lines are needed to cover all zeros?",
    shortAnswer: "4 lines (either all 4 rows or all 4 columns), confirming L = 4 = n (Optimal!).",
    explanation: "Each diagonal zero requires its own row or column line. Minimum lines L = 4.",
    hint: "4 lines (L = 4 = n).",
    level: "moderate",
    codeExample: "Diagonal zeros require n = 4 lines => L = 4."
  },
  {
    question: "What is an 'Intersection Cell' during the line covering test?",
    shortAnswer: "A cell that is covered simultaneously by BOTH a horizontal line and a vertical line (i.e. covered by 2 lines).",
    explanation: "Intersection cells are modified in the additional reduction step by adding e.",
    hint: "A cell covered by both a horizontal and a vertical line.",
    level: "intermediate",
    codeExample: "isIntersection = isCoveredByRowLine && isCoveredByColLine."
  },
  {
    question: "What is an 'Uncovered Cell' during the line covering test?",
    shortAnswer: "A cell that is NOT covered by any horizontal line and NOT covered by any vertical line (i.e. covered by 0 lines).",
    explanation: "The smallest uncovered element e is selected for additional reduction.",
    hint: "A cell covered by 0 lines.",
    level: "intermediate",
    codeExample: "isUncovered = !isCoveredByRowLine && !isCoveredByColLine."
  },
  {
    question: "What is a 'Single-Covered Cell' during the line covering test?",
    shortAnswer: "A cell that is covered by EXACTLY ONE line (either a horizontal line OR a vertical line, but not both).",
    explanation: "Single-covered cells remain completely unchanged during additional reduction.",
    hint: "A cell covered by exactly one line.",
    level: "intermediate",
    codeExample: "isSingleCovered = (rowLine ^ colLine)."
  },
  {
    question: "Suppose Mamata in Kolkata covers a 4x4 matrix with 2 horizontal lines (Rows 1 and 2) and 1 vertical line (Column 4). How many cells are Uncovered, Single-Covered, and Intersections?",
    shortAnswer: "Uncovered = 6 cells (Rows 3,4 and Cols 1,2,3); Single-Covered = 8 cells; Intersections = 2 cells (Cells (1,4) and (2,4)).",
    explanation: "Uncovered = 2x3 = 6; Intersections = 2x1 = 2; Single = 4x4 - 6 - 2 = 8.",
    hint: "Uncovered = 6, Single = 8, Intersections = 2.",
    level: "expert",
    codeExample: "Uncovered: 2*3=6; Intersections: 2*1=2; Single: 16-6-2=8."
  },
  {
    question: "In Mamata's configuration above, what is the total number of lines L, and is the matrix optimal?",
    shortAnswer: "L = 3 lines (2 horizontal + 1 vertical). Since L = 3 < n = 4, the matrix is NOT optimal.",
    explanation: "L = 3 < 4.",
    hint: "L = 3 < 4 (Not optimal).",
    level: "moderate",
    codeExample: "L = 3 < 4 => Sub-optimal."
  },
  {
    question: "Can an operations researcher cover zeros with diagonal lines in the Hungarian Method?",
    shortAnswer: "NO! Lines MUST be strictly HORIZONTAL (entire rows) or strictly VERTICAL (entire columns).",
    explanation: "Diagonal lines are invalid because operations research dual potentials map only to row and column variables.",
    hint: "No, lines must be strictly horizontal or vertical.",
    level: "moderate",
    codeExample: "LineConstraint: Only Horizontal Rows and Vertical Columns permitted."
  },
  {
    question: "Suppose Mahima in Barrackpore accidentally uses 4 lines to cover a matrix when 3 lines were actually sufficient. What will happen?",
    shortAnswer: "She will falsely conclude that L = 4 = n and attempt to assign zeros, but will discover that 4 independent zeros do NOT exist (conflicting allocations).",
    explanation: "Failure to find the TRUE minimum lines leads to an invalid assignment attempt.",
    hint: "Will fail to find 4 independent zeros due to false optimality.",
    level: "expert",
    codeExample: "Warning: Non-minimal line covering gives false optimality."
  },
  {
    question: "What mathematical guarantee prevents L from ever exceeding matrix order n ( L > n )?",
    shortAnswer: "Because simply drawing n horizontal lines (one across each of the n rows) covers 100% of all matrix cells and zeros, the minimum number of lines L can never exceed n ( L <= n ).",
    explanation: "n lines is the trivial upper bound.",
    hint: "Drawing n horizontal lines covers all zeros, so L <= n.",
    level: "intermediate",
    codeExample: "Upper Bound: L <= n."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimum Cost Z* = ₹46'"
  },
  {
    question: "What is the ultimate golden rule of Covering Zeros?",
    shortAnswer: "'Draw the absolute MINIMUM number of horizontal and vertical lines L to cover all zeros; if L = n, celebrate optimality and assign independent zeros; if L < n, proceed to additional reduction with smallest uncovered element e!'",
    explanation: "This complete rule captures all logic of the line covering test.",
    hint: "Draw min lines L -> If L = n (Optimal); if L < n (Additional Reduction).",
    level: "moderate",
    codeExample: "Golden Rule: L = MinLines(Zeros); if (L === n) Assign() else AdditionalReduce(e)."
  }
];

export default questions;
