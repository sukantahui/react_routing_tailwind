// topic4_questions.js
// 30 Moderate to Expert Questions on Updating Penalties After Allocation in Vogel's Approximation Method (VAM)

const questions = [
  {
    question: "Why is it mandatory to recalculate row and column penalties after each allocation step in VAM?",
    shortAnswer: "Because crossing out an exhausted row or column removes cost entries from all intersecting lines, potentially altering their lowest and second-lowest costs.",
    explanation: "When Row k is crossed out, every active column j loses the cell entry c_kj. If c_kj was either the minimum or second minimum in column j, the remaining active candidate set shifts, changing c_(1,j) and/or c_(2,j), and resulting in an updated column penalty P_j' for the next iteration.",
    hint: "Think about what happens to a column's ranking when its cheapest factory is eliminated.",
    level: "moderate",
    codeExample: "Col costs before cross-out: [₹3 (R1), ₹8 (R2), ₹12 (R3)] -> P = ₹5. After R1 cross-out: [₹8, ₹12] -> New P = ₹4."
  },
  {
    question: "What happens to the penalty of a line if the crossed-out cell was its absolute LOWEST cost c_(1)?",
    shortAnswer: "The old second-lowest cost becomes the new lowest cost, and the old third-lowest cost becomes the new second-lowest cost, producing a brand new penalty gap.",
    explanation: "With c_(1) eliminated, the candidate ranking shifts upward: c_(1)' = c_(2) and c_(2)' = c_(3). The new penalty is P' = c_(3) - c_(2).",
    hint: "The second choice is promoted to first choice, exposing the third choice.",
    level: "expert",
    codeExample: "Before: [₹2, ₹7, ₹10] (P=5). Cross out ₹2 -> Remaining: [₹7, ₹10] -> New P = 10 - 7 = ₹3."
  },
  {
    question: "What happens to the penalty of a line if the crossed-out cell was its SECOND-LOWEST cost c_(2)?",
    shortAnswer: "The lowest cost c_(1) remains unchanged, but the third-lowest cost c_(3) becomes the new second-lowest cost, widening the penalty gap.",
    explanation: "With the intermediate backup eliminated, the gap jumps: c_(1)' = c_(1) and c_(2)' = c_(3). The new penalty is P' = c_(3) - c_(1), which is larger than the previous penalty.",
    hint: "Removing the intermediate safety net widens the danger gap to the next available route.",
    level: "expert",
    codeExample: "Before: [₹4, ₹6, ₹25] (P=2). Cross out ₹6 -> Remaining: [₹4, ₹25] -> New P = 25 - 4 = ₹21 (Massive Jump!)."
  },
  {
    question: "What happens to the penalty of a line if the crossed-out cell was HIGHER than its second-lowest cost (e.g. c_(3) or c_(4))?",
    shortAnswer: "The penalty remains completely UNCHANGED (P' = P) because its top two lowest costs are undisturbed.",
    explanation: "Penalty depends strictly on c_(1) and c_(2). Eliminating an expensive outlier cost (e.g. ₹50 when top costs are ₹4 and ₹7) has zero effect on the immediate penalty difference P = ₹7 - ₹4 = ₹3.",
    hint: "Removing an element outside the top two does not affect their difference.",
    level: "moderate",
    codeExample: "Before: [₹3, ₹5, ₹40] (P=2). Cross out ₹40 -> Remaining: [₹3, ₹5] -> New P = 5 - 3 = ₹2."
  },
  {
    question: "How does Mahima in Barrackpore track multi-pass penalty values on a manual tableau?",
    shortAnswer: "By creating sequential margin columns on the right labeled P_R(1), P_R(2), P_R(3)... and sequential margin rows beneath labeled P_C(1), P_C(2), P_C(3)...",
    explanation: "This multi-column margin framework maintains a transparent, auditable history of each iteration's calculations without having to redraw the entire tableau.",
    hint: "Add adjacent columns P_1, P_2, P_3 in the margin.",
    level: "intermediate",
    codeExample: "Right Margin: [Supply | P_R(1) | P_R(2) | P_R(3)]"
  },
  {
    question: "When a row is crossed out, what is written in its penalty position in subsequent passes (e.g. in P_R(2))?",
    shortAnswer: "A dash ('—') or cross is written to indicate that the row is exhausted and excluded from further evaluations.",
    explanation: "The dash confirms that the row has zero remaining supply and prevents accidental recalculation.",
    hint: "Mark exhausted lines with a dash.",
    level: "moderate",
    codeExample: "Row 2 exhausted in Pass 1 => P_R(2) for Row 2 is written as '—'."
  },
  {
    question: "In a 3 x 4 matrix, if Column 2 is crossed out in Pass 1, how many row penalties and column penalties are evaluated in Pass 2?",
    shortAnswer: "3 row penalties and 3 column penalties (total 6 penalties).",
    explanation: "All 3 rows remain active (though with reduced column candidates), while 3 columns remain active (Col 1, Col 3, Col 4). Total = 3 + 3 = 6.",
    hint: "3 active rows + 3 active columns.",
    level: "moderate",
    codeExample: "Pass 2 active lines = 3 rows + 3 columns = 6 penalties."
  },
  {
    question: "Suppose Debangshu in Ichapur evaluates a column whose active costs were [₹5, ₹12, ₹18]. If Row 1 (holding ₹5) is crossed out, what is the new column penalty?",
    shortAnswer: "₹6, calculated as ₹18 minus ₹12.",
    explanation: "Remaining costs are [₹12, ₹18]. Lowest is ₹12, second-lowest is ₹18. New penalty P' = ₹18 - ₹12 = ₹6.",
    hint: "18 - 12 = 6.",
    level: "moderate",
    codeExample: "Remaining: [₹12, ₹18] -> P' = 18 - 12 = ₹6"
  },
  {
    question: "Can a penalty ever become 'undefined' during later iterations of VAM?",
    shortAnswer: "Yes, when only ONE active cell remains in a row or column, there is no second cost to subtract, so the penalty is written as '—'.",
    explanation: "With only one cell left, there is no alternative route. The remaining units must be assigned to that single cell by default.",
    hint: "No second choice means no difference can be computed.",
    level: "moderate",
    codeExample: "Single cell remaining: c_13 = ₹8 -> Penalty = '—'."
  },
  {
    question: "What is the computational effort of updating penalties across all surviving lines in a single iteration?",
    shortAnswer: "O(m * n) arithmetic comparisons per iteration.",
    explanation: "Finding the two lowest numbers across remaining rows and columns takes linear time proportional to the remaining sub-matrix size.",
    hint: "Linear scan of remaining active entries.",
    level: "expert",
    codeExample: "Update work = O(active_rows * active_cols)"
  },
  {
    question: "Suppose Mamata in Kolkata has a row with active costs [₹8, ₹8, ₹15]. If a column containing one of the ₹8 cells is crossed out, what is the new row penalty?",
    shortAnswer: "₹7 (₹15 - ₹8).",
    explanation: "Before cross-out, costs were [₹8, ₹8, ₹15] with P = 8 - 8 = ₹0. After eliminating one ₹8, remaining costs are [₹8, ₹15]. New penalty P' = 15 - 8 = ₹7.",
    hint: "Remaining costs are 8 and 15; subtract 8 from 15.",
    level: "moderate",
    codeExample: "Old: [8, 8, 15] (P=0) -> Cross one 8 -> New: [8, 15] -> P' = 15 - 8 = ₹7."
  },
  {
    question: "How does dynamic penalty updating prevent an early greedy allocation from turning into a disaster later?",
    shortAnswer: "By immediately raising the priority of lines that lost their backup routes, ensuring they get protected before their third-choice disasters occur.",
    explanation: "As shown above, losing a ₹8 backup route caused the penalty to jump from ₹0 to ₹7. VAM detects this newly emerged vulnerability immediately on the next pass.",
    hint: "The updated penalty signals newly created risk.",
    level: "expert",
    codeExample: "Penalty escalation: P increases from ₹0 to ₹7, alerting VAM to prioritize this line."
  },
  {
    question: "If Susmita in Jadavpur has 2 rows and 2 columns remaining with costs [[4, 9], [6, 8]], what are the updated row and column penalties?",
    shortAnswer: "Row penalties: P_1 = 5, P_2 = 2; Column penalties: P_1 = 2, P_2 = 1.",
    explanation: "Row 1: 9 - 4 = ₹5; Row 2: 8 - 6 = ₹2. Col 1: 6 - 4 = ₹2; Col 2: 9 - 8 = ₹1. Max penalty is Row 1 (P = ₹5).",
    hint: "Compute differences for the 2x2 sub-matrix.",
    level: "moderate",
    codeExample: "P_R1=5, P_R2=2, P_C1=2, P_C2=1 => Max is P_R1 = ₹5."
  },
  {
    question: "In the 2 x 2 sub-matrix above, which cell receives the allocation in this pass?",
    shortAnswer: "Cell (1, 1) with unit cost ₹4 in winning Row 1.",
    explanation: "Inside winning Row 1, cell (1, 1) has the lowest cost at ₹4/unit.",
    hint: "Smallest cell in Row 1 is 4.",
    level: "moderate",
    codeExample: "Target = Cell (1, 1) @ ₹4"
  },
  {
    question: "What happens when the active sub-matrix shrinks to a single column (m x 1)?",
    shortAnswer: "No column penalty is defined; remaining row supplies are allocated directly to fulfill the single column's remaining demand.",
    explanation: "All remaining factories must ship their inventory into the sole destination market.",
    hint: "Single column means all remaining suppliers must ship there.",
    level: "moderate",
    codeExample: "Sub-matrix m x 1: allocate x_i1 = S_i for all remaining rows i."
  },
  {
    question: "Why should an operations research student never copy old penalties from Pass 1 into Pass 2?",
    shortAnswer: "Because doing so ignores the structural change of the reduced matrix, leading to incorrect line selections and invalid basic solutions.",
    explanation: "Old penalties reflect options that may no longer exist. Every pass requires an independent recalculation of remaining active costs.",
    hint: "Static penalties destroy the dynamic lookahead advantage of VAM.",
    level: "moderate",
    codeExample: "Rule: Always recalculate P_i' and P_j' for the active sub-matrix."
  },
  {
    question: "Suppose Abhronila in Barrackpore has a column with costs [₹10, ₹14, ₹22]. If Row 2 (cost ₹14) is crossed out, what is the new column penalty?",
    shortAnswer: "₹12 (₹22 - ₹10).",
    explanation: "Remaining costs are [₹10, ₹22]. Lowest is ₹10, second-lowest is ₹22. New penalty P' = 22 - 10 = ₹12.",
    hint: "22 - 10 = 12.",
    level: "moderate",
    codeExample: "Remaining: [₹10, ₹22] -> P' = 22 - 10 = ₹12"
  },
  {
    question: "How does the penalty jump from ₹4 to ₹12 in the above scenario illustrate 'risk acceleration'?",
    shortAnswer: "Removing the intermediate ₹14 route left only the ₹22 route as backup, tripling the potential regret cost if the ₹10 route is missed.",
    explanation: "The penalty dynamically reflects the increased danger, alerting VAM to prioritize this column in the very next pass.",
    hint: "Bigger gap = higher urgency.",
    level: "expert",
    codeExample: "Risk increased 3x: from ₹4/unit regret to ₹12/unit regret."
  },
  {
    question: "What is the maximum number of times penalties will be updated in an m x n transportation problem?",
    shortAnswer: "At most m + n - 2 update passes.",
    explanation: "The first pass computes initial penalties. Since at most m + n - 1 allocation steps occur and the final step requires no penalty calculation, there are at most m + n - 2 recalculation passes.",
    hint: "Total steps minus 1.",
    level: "expert",
    codeExample: "Max Update Passes = (m + n - 1) - 1 = m + n - 2"
  },
  {
    question: "If a row has remaining supply S_i = 40 after an allocation, does its row penalty change if no columns were crossed out in that step?",
    shortAnswer: "No, because the active unit costs c_ij within that row have not changed.",
    explanation: "Penalties depend purely on active cost coefficients, not on remaining numerical supply balances.",
    hint: "Cost coefficients determine penalties, not inventory quantities.",
    level: "intermediate",
    codeExample: "P_i depends on {c_ij | col j is active}."
  },
  {
    question: "How does Mahima verify that she has crossed out the correct number of rows and columns after 3 passes?",
    shortAnswer: "The sum of crossed-out rows plus crossed-out columns must equal exactly 3.",
    explanation: "Each standard allocation step eliminates exactly one row or one column.",
    hint: "Each step eliminates exactly one line.",
    level: "intermediate",
    codeExample: "CrossedLines = numCrossedRows + numCrossedCols == currentStep"
  },
  {
    question: "Suppose in Pass 2, all row penalties are ₹0 and all column penalties are ₹0. What is the selection rule?",
    shortAnswer: "Select the cell with the absolute lowest unit cost min(c_ij) across the entire active sub-matrix.",
    explanation: "Universal zero penalty indicates all lines have identical 1st and 2nd choices; VAM gracefully falls back to Least Cost selection.",
    hint: "When all penalties are 0, pick global minimum in remaining matrix.",
    level: "expert",
    codeExample: "All P = 0 -> Target = argmin_{active} c_ij."
  },
  {
    question: "Why is tracking updated penalties in dedicated margin columns better than erasing old values?",
    shortAnswer: "Because it preserves the full step-by-step mathematical proof and allows immediate error localization during audits.",
    explanation: "Erasing old values destroys the audit trail, making it impossible to check where an arithmetic slip occurred.",
    hint: "Keep a transparent historical record across passes.",
    level: "intermediate",
    codeExample: "Keep P_1, P_2, P_3 intact side-by-side."
  },
  {
    question: "If Debangshu's active sub-matrix has size 2 x 3, how many penalties must be computed in this pass?",
    shortAnswer: "5 penalties (2 row penalties + 3 column penalties).",
    explanation: "2 active rows + 3 active columns = 5 penalties.",
    hint: "2 + 3 = 5.",
    level: "moderate",
    codeExample: "Penalties = m_active + n_active = 2 + 3 = 5"
  },
  {
    question: "In the 2 x 3 sub-matrix, if Row 1 has costs [₹6, ₹10, ₹14], what is its updated penalty?",
    shortAnswer: "₹4 (₹10 - ₹6).",
    explanation: "Sorted active costs are [₹6, ₹10, ₹14]. Lowest is ₹6, second-lowest is ₹10. Penalty = ₹10 - ₹6 = ₹4.",
    hint: "10 - 6 = 4.",
    level: "moderate",
    codeExample: "P_R1' = 10 - 6 = ₹4"
  },
  {
    question: "If Column 3 in the above sub-matrix has costs [₹14, ₹9], what is its updated penalty?",
    shortAnswer: "₹5 (₹14 - ₹9).",
    explanation: "Sorted active costs are [₹9, ₹14]. Lowest is ₹9, second-lowest is ₹14. Penalty = ₹14 - ₹9 = ₹5.",
    hint: "14 - 9 = 5.",
    level: "moderate",
    codeExample: "P_C3' = 14 - 9 = ₹5"
  },
  {
    question: "Comparing P_R1 = ₹4 and P_C3 = ₹5, which line wins in this updated pass?",
    shortAnswer: "Column 3 wins with maximum penalty P = ₹5.",
    explanation: "₹5 is greater than ₹4, so Column 3 is the winning line.",
    hint: "5 > 4.",
    level: "moderate",
    codeExample: "Max penalty is Column 3 (P = ₹5)."
  },
  {
    question: "Inside winning Column 3 (costs ₹14 in Row 1, ₹9 in Row 2), which cell receives the allocation?",
    shortAnswer: "Cell (2, 3) in Row 2 @ ₹9/unit.",
    explanation: "Within Column 3, Row 2 offers the lowest cost at ₹9/unit.",
    hint: "Pick ₹9 over ₹14.",
    level: "moderate",
    codeExample: "Target = Cell (2, 3) @ ₹9"
  },
  {
    question: "What is the core pedagogical takeaway of Topic 4 for operations research students?",
    shortAnswer: "VAM is a dynamic adaptive heuristic: every allocation changes the landscape of risk, and recalculating penalties ensures every decision adapts to the new reality.",
    explanation: "Static algorithms fail because they do not adapt to constraints being eliminated. VAM's dynamic updating is the secret to its superior performance.",
    hint: "Adaptation to changing risk profiles makes VAM near-optimal.",
    level: "expert",
    codeExample: "Dynamic Adaptation: New Matrix -> New Penalties -> Optimal Step."
  },
  {
    question: "How does mastering penalty updates prepare students for software engineering of optimization solvers?",
    shortAnswer: "It models state reduction, dynamic priority queues, and indexed heap updates used in high-performance graph and network algorithms.",
    explanation: "Efficiently updating minimums and secondary minimums in a reduced sub-matrix mirrors the node-pruning and priority-updating logic of Dijkstra's and Simplex network solvers.",
    hint: "Heap updates and dynamic state maintenance are foundational in CS optimization.",
    level: "expert",
    codeExample: "Solver Architecture: PriorityQueue.update(active_lines, new_penalties)"
  }
];

export default questions;
