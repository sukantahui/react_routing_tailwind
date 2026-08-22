// topic1_questions.js
// 30 Moderate to Expert Questions on Row and Column Penalties in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "What is the precise procedural difference between calculating a 'Row Penalty' and a 'Column Penalty' in VAM?",
    shortAnswer: "Row penalty evaluates unit costs horizontally across columns for a given origin, while column penalty evaluates unit costs vertically across rows for a given destination.",
    explanation: "For any active row i, the allocator sorts all active horizontal entries {c_i1, c_i2, ..., c_in} and computes P_i = c_(i,2) - c_(i,1). For any active column j, the allocator sorts all active vertical entries {c_1j, c_2j, ..., c_mj} and computes P_j = c_(2,j) - c_(1,j). Both quantify opportunity cost but along orthogonal constraint axes.",
    hint: "Think horizontal scan across destinations vs vertical scan down through factories.",
    level: "moderate",
    codeExample: "Row: P_i = min2(c_i*) - min1(c_i*); Column: P_j = min2(c_*j) - min1(c_*j)"
  },
  {
    question: "In a 4 x 5 transportation tableau, how many total individual penalties must be evaluated in Tableau 1?",
    shortAnswer: "Exactly 9 penalties (4 row penalties + 5 column penalties).",
    explanation: "In an m x n matrix, every active row origin has competing distribution routes and every active column destination has competing factory sources. Therefore, in the first full tableau, m row penalties and n column penalties must be calculated, totaling m + n = 4 + 5 = 9 penalties.",
    hint: "Add total number of supply rows to total number of demand columns.",
    level: "moderate",
    codeExample: "Total initial penalties = m + n = 4 + 5 = 9"
  },
  {
    question: "Suppose Column 2 has costs [₹14, ₹8, ₹19, ₹8]. What is the column penalty P_2?",
    shortAnswer: "₹0, because the smallest cost is ₹8 and the second smallest cost is also ₹8.",
    explanation: "Sorting the entries in Column 2 yields [₹8, ₹8, ₹14, ₹19]. The 1st lowest cost is ₹8 and the 2nd lowest cost is ₹8. The difference is P_2 = ₹8 - ₹8 = ₹0. A zero column penalty indicates that even if one ₹8 supplier is exhausted, an alternative supplier offering the same ₹8 rate remains available.",
    hint: "Identify the two smallest numbers in the sorted array [8, 8, 14, 19].",
    level: "moderate",
    codeExample: "c_(1, 2) = 8, c_(2, 2) = 8 => P_2 = 8 - 8 = ₹0"
  },
  {
    question: "Why do standard VAM tableaus display row penalties on the right margin and column penalties on the bottom margin?",
    shortAnswer: "To align row penalties directly beside their respective supply equations and column penalties beneath their respective demand equations.",
    explanation: "Placing row penalties P_i to the right of the supply column allows the analyst to directly inspect the corresponding row's capacity S_i and unit costs in one horizontal glance. Placing column penalties P_j beneath the demand row aligns with vertical destination requirements D_j, establishing a visual audit grid.",
    hint: "Think of margin annotations matching the dimensional direction of the matrix.",
    level: "moderate",
    codeExample: "Right margin: [P_1, P_2, ..., P_m]^T; Bottom margin: [P_1, P_2, ..., P_n]"
  },
  {
    question: "If Debangshu's Barrackpore warehouse row has costs [₹25, ₹4, ₹11, ₹19], how is the row penalty determined?",
    shortAnswer: "₹7, calculated as ₹11 (2nd smallest) minus ₹4 (1st smallest).",
    explanation: "The active row entries are [₹25, ₹4, ₹11, ₹19]. Sorting ascending gives [₹4, ₹11, ₹19, ₹25]. The lowest cost is ₹4 and the second-lowest cost is ₹11. The row penalty is P_1 = ₹11 - ₹4 = ₹7 per unit.",
    hint: "Pick the two lowest costs: 4 and 11.",
    level: "moderate",
    codeExample: "P(Barrackpore) = ₹11 - ₹4 = ₹7/unit"
  },
  {
    question: "What happens to the column penalties when Row 1 is completely exhausted and crossed out?",
    shortAnswer: "Every column that previously had its lowest or second-lowest cost located in Row 1 will see its penalty change and must be recomputed.",
    explanation: "Crossing out Row 1 removes all elements c_1j from the active set. For any column j where c_1j was either the minimum or second minimum, the remaining candidate pool shifts, creating a new c_(1,j) and/or c_(2,j), thereby altering P_j. Columns where Row 1 was higher than the 2nd lowest maintain unchanged penalties.",
    hint: "Check whether Row 1 contributed to the top-two cheapest slots in each column.",
    level: "expert",
    codeExample: "If c_1j was min1, then old min2 becomes new min1, and old min3 becomes new min2 -> P_j' = c_3j - c_2j."
  },
  {
    question: "Can a row penalty change if an allocation is made in that row but the row is NOT yet crossed out?",
    shortAnswer: "No, because the cost entries inside that row remain active until the row's total supply is reduced to zero.",
    explanation: "An allocation reduces the remaining numerical capacity S_i, but does not cross out the row unless S_i becomes 0. As long as the column satisfied in that step did not eliminate one of the top two costs of Row i, Row i's unit costs c_ij remain unchanged, keeping P_i identical.",
    hint: "Row penalty depends on cost coefficients c_ij, not on remaining supply balance S_i.",
    level: "expert",
    codeExample: "P_i depends purely on set {c_ij | col j is active}. If active col set is unchanged, P_i is constant."
  },
  {
    question: "How does the introduction of a ₹0 dummy column in an unbalanced problem affect row penalties versus column penalties?",
    shortAnswer: "It alters all row penalties because ₹0 becomes the new lowest cost in every row, while the dummy column's own penalty is the difference between its two lowest entries (usually ₹0 - ₹0 = ₹0).",
    explanation: "When a dummy column with [₹0, ₹0, ..., ₹0]^T is added, every row i now contains ₹0 as its smallest element. Thus, the row penalty becomes P_i = (old smallest cost) - ₹0 = old smallest cost. The dummy column itself has all entries ₹0, so P_dummy = ₹0 - ₹0 = ₹0.",
    hint: "In row i, ₹0 is now c_(1), so the old c_(1) becomes the new c_(2).",
    level: "expert",
    codeExample: "Row costs: [₹8, ₹15, ₹12] + Dummy [₹0] -> P_i = ₹8 - ₹0 = ₹8 (which equals old min cost!)."
  },
  {
    question: "If Susmita evaluates a 2 x 3 matrix, how many row penalties and column penalties are calculated?",
    shortAnswer: "2 row penalties and 3 column penalties, totaling 5 penalties.",
    explanation: "An origin set of size m=2 yields P_1 and P_2. A destination set of size n=3 yields P_1, P_2, and P_3. Total count = 2 + 3 = 5.",
    hint: "m rows = m penalties, n columns = n penalties.",
    level: "moderate",
    codeExample: "Rows: S1, S2 (2 penalties); Cols: D1, D2, D3 (3 penalties)."
  },
  {
    question: "In a 1 x n remaining sub-matrix (only one active row left), how are row and column penalties handled?",
    shortAnswer: "No row penalty can be calculated (marked '-'), and column penalties also become '-' since each column has only one row entry left; allocations to all remaining cells become forced.",
    explanation: "When only one active row remains, there is only one cost per column and no second-choice route in any line. All remaining demands are fulfilled directly from this final row until feasibility is achieved, bypassing further penalty evaluations.",
    hint: "When one row is left, there is no choice or regret—allocations are strictly determined by remaining demands.",
    level: "intermediate",
    codeExample: "Sub-matrix 1 x 3: Direct allocation x_1j = D_j for j = 1, 2, 3."
  },
  {
    question: "Suppose Mamata in Kolkata has a column with costs [₹16, ₹22, ₹16]. What is the column penalty?",
    shortAnswer: "₹0, because the two lowest costs are both ₹16.",
    explanation: "Sorted costs: [₹16, ₹16, ₹22]. Lowest = ₹16, second lowest = ₹16. Difference = ₹16 - ₹16 = ₹0.",
    hint: "Two identical smallest entries yield zero difference.",
    level: "moderate",
    codeExample: "P = 16 - 16 = ₹0"
  },
  {
    question: "Why is a row with penalty ₹0 considered the lowest priority for immediate allocation?",
    shortAnswer: "Because having two or more identical lowest-cost routes means delaying allocation causes zero immediate cost increase if one route is lost.",
    explanation: "Penalty measures the cost of procrastination. If a row has costs [₹5, ₹5, ₹12], losing one ₹5 destination still leaves another ₹5 destination available, resulting in ₹0 regret. Therefore, the allocator prioritizes lines where missing the best route forces a steep price jump.",
    hint: "Zero regret implies perfect short-term substitutability.",
    level: "moderate",
    codeExample: "Regret = ₹5 - ₹5 = ₹0 => Procrastination penalty is zero."
  },
  {
    question: "Under what conditions can a row penalty increase in a subsequent iteration?",
    shortAnswer: "When an intersecting column containing the row's second-lowest cost is crossed out, exposing a much higher third cost as the new second-lowest.",
    explanation: "Consider row costs [₹3, ₹5, ₹20]. Initial penalty is ₹5 - ₹3 = ₹2. If the column containing ₹5 is crossed out by another row's allocation, the remaining costs in this row become [₹3, ₹20]. The updated penalty jumps dramatically to ₹20 - ₹3 = ₹17.",
    hint: "Removing the intermediate buffer route widens the gap to the next fallback option.",
    level: "expert",
    codeExample: "Before: [3, 5, 20] -> P=2. Col with 5 crossed out -> [3, 20] -> New P = 20 - 3 = 17."
  },
  {
    question: "Can a column penalty decrease in a subsequent iteration? Explain how.",
    shortAnswer: "Yes, if the row containing the column's highest cost or second-lowest cost is eliminated, or when the cost gap between remaining options happens to be narrower.",
    explanation: "Consider column costs [₹4, ₹15, ₹18]. Initial penalty is ₹15 - ₹4 = ₹11. If the row containing ₹4 is crossed out, the remaining costs are [₹15, ₹18], making the new penalty ₹18 - ₹15 = ₹3, which is significantly smaller.",
    hint: "Eliminating the outlier cheapest cell leaves two closer-priced alternatives.",
    level: "expert",
    codeExample: "Before: [4, 15, 18] -> P=11. Eliminate 4 -> [15, 18] -> New P = 3."
  },
  {
    question: "How does Mahima verify that all row and column penalties in Tableau 1 have been computed correctly?",
    shortAnswer: "By checking that: (1) exactly m + n penalties exist, (2) all penalties are non-negative (>= 0), and (3) each penalty equals the 2nd lowest minus 1st lowest in that line.",
    explanation: "Verification protocol: Count row penalties = m, column penalties = n. Ensure no negative numbers appear. Cross-verify that each P_i equals element[1] - element[0] of the sorted active line array.",
    hint: "Perform dimensional count and non-negativity audit.",
    level: "intermediate",
    codeExample: "Audit: len(P_rows) == m, len(P_cols) == n, all(p >= 0 for p in P_rows + P_cols)"
  },
  {
    question: "If Abhronila has a 3 x 4 transportation problem, what is the maximum number of times penalties will be computed throughout the full VAM process?",
    shortAnswer: "At most (m + n - 1) = 6 iterations, computing penalties for the decreasing active sub-matrices.",
    explanation: "An m x n problem terminates in at most m + n - 1 basic allocation steps. For a 3 x 4 matrix, there are at most 3 + 4 - 1 = 6 steps. In each step, penalties are computed for surviving lines until only 1 row or 1 column remains.",
    hint: "Count total basic variables (m + n - 1).",
    level: "moderate",
    codeExample: "3 + 4 - 1 = 6 total allocation passes."
  },
  {
    question: "In a row with entries [₹7, ₹7, ₹7, ₹7], what is the penalty, and what does it indicate about the origin's flexibility?",
    shortAnswer: "Penalty is ₹0; it indicates total operational flexibility, as all destination routes cost the same.",
    explanation: "Since every destination offers the identical unit freight rate of ₹7, the factory is indifferent to where its inventory is dispatched. It can safely serve as a flexible filler for other high-penalty destinations.",
    hint: "Zero variance across all entries produces zero penalty.",
    level: "moderate",
    codeExample: "P = 7 - 7 = ₹0. Indifference across all 4 destinations."
  },
  {
    question: "If a column has entries [₹10, ₹14, ₹30] and its row containing ₹10 has supply 50 while column demand is 80, why does Column Penalty matter?",
    shortAnswer: "Because the factory with ₹10 cannot satisfy the full 80 units demand, forcing 30 units onto the ₹14 route (a ₹4/unit penalty).",
    explanation: "Column penalty P = ₹14 - ₹10 = ₹4 quantifies the exact marginal surcharge for every unit of demand that cannot be supplied by the cheapest source. When demand exceeds the cheapest supplier's capacity, this penalty is inevitably incurred on the overflow.",
    hint: "Observe the overflow units spilling into the second-cheapest route.",
    level: "expert",
    codeExample: "Overflow = 80 - 50 = 30 units @ ₹14. Surcharge = 30 * (14 - 10) = ₹120."
  },
  {
    question: "What is the consequence if an analyst accidentally uses column costs to compute row penalties?",
    shortAnswer: "The entire allocation priority collapses, potentially creating invalid high-cost assignments and destroying the VAM heuristic advantage.",
    explanation: "Row penalties must strictly represent horizontal supply competition (destinations available to a factory). Mixing row and column vectors confuses supply constraints with demand constraints, producing meaningless regret numbers.",
    hint: "Always maintain strict row (horizontal) and column (vertical) vector boundaries.",
    level: "moderate",
    codeExample: "Row Vector: [c_i1, c_i2, ..., c_in]; Column Vector: [c_1j, c_2j, ..., c_mj]"
  },
  {
    question: "When two rows have the same penalty, say P_1 = ₹12 and P_2 = ₹12, how should the comparison proceed if this is the maximum penalty?",
    shortAnswer: "Compare the minimum unit cost in Row 1 against the minimum unit cost in Row 2, and select the row with the lower minimum cost.",
    explanation: "If P_1 = P_2 = max(P), check c_min(Row 1) vs c_min(Row 2). If Row 1 has a minimum cost of ₹3 and Row 2 has a minimum cost of ₹5, choose Row 1 because allocating to ₹3 yields a lower absolute unit cost for that batch.",
    hint: "Tie-breaker rule 1: Pick the line with the smallest absolute unit cost.",
    level: "expert",
    codeExample: "P_1 = ₹12 (c_min = ₹3); P_2 = ₹12 (c_min = ₹5) => Select Row 1."
  },
  {
    question: "Suppose in Ichapur, a column for Jadavpur Depot has unit costs [₹40, ₹12, ₹18]. What is the column penalty?",
    shortAnswer: "₹6, calculated as ₹18 (second lowest) minus ₹12 (lowest).",
    explanation: "Sorted costs: [₹12, ₹18, ₹40]. Lowest is ₹12, second lowest is ₹18. Penalty = ₹18 - ₹12 = ₹6.",
    hint: "Subtract the smallest (12) from the second smallest (18).",
    level: "moderate",
    codeExample: "P(Jadavpur) = ₹18 - ₹12 = ₹6"
  },
  {
    question: "How does the penalty method treat rows or columns where some routes are blocked (prohibited with cost M)?",
    shortAnswer: "The prohibited cost M acts as a massive penalty inflation factor, forcing VAM to prioritize the valid route and prevent allocating to M.",
    explanation: "If a row has costs [₹5, M], the penalty is M - ₹5 ≈ ∞. This gigantic penalty guarantees that this row is selected first, allocating all available capacity to the ₹5 cell before the blocked M route could ever be considered.",
    hint: "Infinity minus a constant is still approximately infinity.",
    level: "expert",
    codeExample: "Costs: [₹5, M] -> Penalty = M - 5. Max penalty across table -> Allocates to ₹5 route immediately."
  },
  {
    question: "Why do row penalties reflect 'supplier regret' while column penalties reflect 'buyer regret'?",
    shortAnswer: "Row penalties measure the extra cost a supplier incurs if denied their cheapest market, whereas column penalties measure the extra cost a buyer pays if denied their cheapest supplier.",
    explanation: "Supply origins (factories) want to dispatch through their most economical transport links. Destination markets want to purchase from the lowest-freight factories. Symmetrically calculating both ensures neither supplier nor consumer regret is ignored.",
    hint: "Suppliers look outward at distribution lanes; buyers look inward at supply sources.",
    level: "expert",
    codeExample: "Supplier Regret: P_i = c_(i,2) - c_(i,1); Buyer Regret: P_j = c_(2,j) - c_(1,j)"
  },
  {
    question: "In a 3 x 3 problem, if Row 1 has costs [₹2, ₹8, ₹10], Row 2 has [₹5, ₹6, ₹7], and Row 3 has [₹1, ₹9, ₹12], which row has the highest supplier regret?",
    shortAnswer: "Row 3 has the highest supplier regret with P_3 = ₹8 (₹9 - ₹1).",
    explanation: "Compute row penalties: P_1 = 8 - 2 = ₹6; P_2 = 6 - 5 = ₹1; P_3 = 9 - 1 = ₹8. Row 3 has the largest penalty of ₹8.",
    hint: "Compare 6 vs 1 vs 8.",
    level: "moderate",
    codeExample: "P_1 = ₹6, P_2 = ₹1, P_3 = ₹8 => max is P_3 = ₹8"
  },
  {
    question: "What is the computational complexity of computing all row and column penalties for an m x n matrix in a single pass?",
    shortAnswer: "O(m * n) arithmetic operations.",
    explanation: "Finding the two smallest elements in an array of size k takes a single linear scan in O(k) time. Doing this for m rows of length n takes O(m*n) time, and for n columns of length m takes O(n*m) time. Total work per iteration is O(mn).",
    hint: "Scanning each cell once horizontally and once vertically is linear in matrix size.",
    level: "expert",
    codeExample: "Row pass: m * O(n) = O(mn); Col pass: n * O(m) = O(mn); Total = O(mn)"
  },
  {
    question: "How should an analyst format their working table on paper during an operations research examination?",
    shortAnswer: "Include dedicated columns labeled P_1, P_2, P_3... on the right and dedicated rows labeled P_1, P_2, P_3... at the bottom, updating them column-by-column across successive iterations.",
    explanation: "Adding sequential margin headers (P_1 for Tableau 1, P_2 for Tableau 2) creates a transparent progression record. Crossing out old penalties and writing new values in adjacent sub-columns prevents overwriting errors.",
    hint: "Maintain multi-column penalty margins for Iterations 1, 2, 3.",
    level: "intermediate",
    codeExample: "Margin: [Supply | P_Iter1 | P_Iter2 | P_Iter3]"
  },
  {
    question: "If Debangshu observes that all row penalties are zero (P_i = 0 for all i) and all column penalties are zero (P_j = 0 for all j), what does this reveal about the cost matrix?",
    shortAnswer: "Every row and every column contains at least two identical lowest-cost cells, indicating widespread degeneracy or uniform pricing across the network.",
    explanation: "For P to equal 0 everywhere, each row i must have c_(i,1) = c_(i,2) and each column j must have c_(1,j) = c_(2,j). This happens when freight rates are uniformly tiered (e.g. flat city-wide rates). In such cases, VAM gracefully reduces to Least Cost tie-breaking.",
    hint: "Zero penalty across all lines means no cost jump between 1st and 2nd choices anywhere.",
    level: "expert",
    codeExample: "Flat tariff matrix: All P_i = 0, all P_j = 0 -> Any cheapest cell can be selected."
  },
  {
    question: "Why is it mathematically impossible for a penalty in a standard transportation problem to be strictly less than zero?",
    shortAnswer: "Because unit costs in any line are ordered such that c_(2) >= c_(1), guaranteeing P = c_(2) - c_(1) >= 0.",
    explanation: "The second smallest real number in any set is by mathematical ordering greater than or equal to the smallest real number. Thus, the difference can never be negative.",
    hint: "Can the second smallest item in a list be smaller than the first smallest?",
    level: "moderate",
    codeExample: "c_(2) >= c_(1) <=> c_(2) - c_(1) >= 0"
  },
  {
    question: "If a column contains costs [₹12, ₹15, ₹18, ₹24], what is the penalty, and which row holds the cheapest route for this destination?",
    shortAnswer: "The penalty is ₹3 (₹15 - ₹12), and Row 1 holds the cheapest route at ₹12.",
    explanation: "Sorted costs: [₹12, ₹15, ₹18, ₹24]. Lowest is ₹12 (Row 1), second-lowest is ₹15 (Row 2). Penalty = ₹15 - ₹12 = ₹3.",
    hint: "Smallest is 12 (Row 1), next is 15.",
    level: "moderate",
    codeExample: "P = 15 - 12 = ₹3; Min cell = (Row 1, Col j) @ ₹12"
  },
  {
    question: "How does thorough understanding of row and column penalties prepare students for advanced dual simplex and sensitivity analysis?",
    shortAnswer: "Penalties intuitively model the simplex shadow price differentials (opportunity costs) that govern dual feasibility and optimal basis stability.",
    explanation: "In linear programming duality, reduced costs (c_ij - u_i - v_j) indicate whether a non-basic variable should enter the basis. Row and column penalties in VAM serve as a first-order discrete approximation of these dual gradients, bridging intuitive heuristics with formal LP duality.",
    hint: "Think of penalty as the discrete analog of the shadow price gradient.",
    level: "expert",
    codeExample: "Penalty ≈ Delta(c_ij) ≈ Marginal Dual Opportunity Cost"
  }
];

export default questions;
