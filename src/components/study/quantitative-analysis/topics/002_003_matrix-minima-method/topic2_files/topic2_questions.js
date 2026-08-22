// topic2_questions.js
// 30 Moderate to Expert Questions on Selecting the Minimum Cost Cell

const questions = [
  {
    question: "What is the mathematical condition for identifying the minimum cost cell in an active transportation tableau?",
    shortAnswer: "Select cell (k, l) such that c_kl = min { c_ij : S_i > 0 and D_j > 0 }.",
    explanation: "At any iteration of the Matrix Minima Method, only cells belonging to active (unexhausted) origin rows i and active (unsatisfied) destination columns j are eligible. The selection operator finds the global argmin among all valid pairs (i, j).",
    hint: "Identify the smallest numerical freight rate in all uncrossed rows and columns.",
    level: "basic",
    codeExample: "(k, l) = argmin_{(i,j) ∈ Active} { c_ij }"
  },
  {
    question: "How should an analyst break a tie when multiple active cells have the exact same minimum unit cost (c_ab = c_cd = min(C))?",
    shortAnswer: "Prioritize the cell that allows the maximum allocation quantity: max { min(S_i, D_j) }.",
    explanation: "If two cells tie at ₹3/unit, assigning to a cell that can absorb 80 units generates an immediate logistics savings on 80 units, whereas assigning to a cell with only 10 units capacity provides much less total cost reduction at that rate.",
    hint: "Choose the cell where you can push the largest volume of cargo at the cheapest rate.",
    level: "intermediate",
    codeExample: "if (c[a][b] === c[c][d]) {\n  const vol1 = Math.min(S[a], D[b]);\n  const vol2 = Math.min(S[c], D[d]);\n  return vol1 >= vol2 ? [a, b] : [c, d];\n}"
  },
  {
    question: "If both unit cost and allocation capacity are identical between tied cells, what is the secondary tie-breaking criterion?",
    shortAnswer: "Select the cell located in the row or column with the larger remaining total capacity, or choose arbitrarily if still identical.",
    explanation: "Allocating to the line with greater remaining capacity helps relieve pressure on high-capacity depots, preventing large surpluses from being stranded in later, more expensive iterations.",
    hint: "Give preference to the factory or warehouse holding the bigger inventory surplus.",
    level: "intermediate",
    codeExample: "Secondary rule: pick argmax(S[i] + D[j]) among capacity-tied cells."
  },
  {
    question: "Why is it an error to select a cell with a low cost if its row or column was eliminated in a previous step?",
    shortAnswer: "Eliminated rows have S_i = 0 and eliminated columns have D_j = 0; allocating to them would attempt to move 0 units (x_ij = min(0, D_j) = 0) or violate balance constraints.",
    explanation: "Once an origin has shipped all its goods or a destination has received its quota, the line is closed. Searching eliminated lines wastes iterations or leads to physically invalid shipments.",
    hint: "You cannot buy from an empty warehouse or deliver to a full depot.",
    level: "basic",
    codeExample: "if (!rowActive[i] || !colActive[j]) continue; // Must be skipped"
  },
  {
    question: "In computational implementations, how does a 2D matrix scanning approach compare with a Min-Heap for cell selection?",
    shortAnswer: "2D scanning takes O(m · n) per selection, whereas a Min-Heap extracts the minimum in O(log(mn)) time after an O(mn) initial build.",
    explanation: "For an m × n matrix over (m + n - 1) iterations, naive scanning incurs O((m + n)mn) total time. With a priority queue (min-heap), extracting elements and discarding inactive entries takes amortized O(mn log(mn)), which scales much better for large-scale enterprise supply chains.",
    hint: "Think about binary heap extraction vs nested for-loop iterations.",
    level: "expert",
    codeExample: "PriorityQueue<Cell> minHeap = new PriorityQueue<>((a, b) => a.cost - b.cost);"
  },
  {
    question: "How does the selection of ₹0 dummy cells affect the physical allocation of real goods in an unbalanced problem?",
    shortAnswer: "Allocating to a ₹0 dummy cell designates which factory retains unproduced/unshipped surplus or which destination suffers unmet demand.",
    explanation: "A dummy cell represents virtual capacity. If factory 1 has 50 units allocated to a dummy column with cost ₹0, factory 1 physically holds 50 units in local inventory and ships nothing across the network for that quantity.",
    hint: "A zero-cost dummy allocation means 'keep stock at origin' or 'demand remains unfulfilled'.",
    level: "expert",
    codeExample: "x[1][dummy] = 50 @ ₹0 ⇒ Origin 1 retains 50 units in local warehouse."
  },
  {
    question: "What is the Big-M method for prohibited routes, and how does it influence cell selection?",
    shortAnswer: "Set the unit cost of prohibited cells to an arbitrarily large value M (e.g., ₹999,999); the minimum-search algorithm will naturally avoid selecting them.",
    explanation: "If a transport link is physically unavailable (e.g., flooded roads, customs restrictions between Ichapur and Jadavpur), setting c_ij = M guarantees that the argmin operator will never pick cell (i, j) as long as any standard finite route exists.",
    hint: "Make the route so exorbitantly expensive that the computer will never choose it.",
    level: "intermediate",
    codeExample: "const M = 1e9;\ncostMatrix[prohibitedRow][prohibitedCol] = M;"
  },
  {
    question: "Can selecting the minimum cost cell at Step 1 ever lead to a higher overall total cost Z than an alternative initial selection?",
    shortAnswer: "Yes, because the greedy heuristic ignores future penalties (opportunity loss) that may force large remaining shipments into expensive routes later.",
    explanation: "Greedy choice is locally optimal but globally short-sighted. For example, picking a ₹2 route might exhaust a supply that was the only economical option for another city, forcing that city to pay ₹40/unit later. Vogel's Approximation Method (VAM) overcomes this by evaluating line penalties.",
    hint: "Short-term savings can create massive downstream supply bottlenecks.",
    level: "expert",
    codeExample: "Step 1: Save ₹1/unit on 10 units. Step 3: Forced into ₹50/unit on 50 units due to depleted stock."
  },
  {
    question: "What happens if all cells in an active submatrix have identical costs (e.g., all c_ij = ₹5)?",
    shortAnswer: "Every cell is a candidate for selection; tie-breaking criteria govern the choice, but all feasible solutions yield the exact same total transportation cost.",
    explanation: "When costs are uniform across all routes, total cost is simply Z = ₹5 × Total Flow, regardless of the shipment pattern chosen. Feasibility is preserved regardless of which cell is selected first.",
    hint: "If every ticket costs the same, any travel route results in the exact same travel expenditure.",
    level: "intermediate",
    codeExample: "c_ij = K ∀ i, j ⇒ Total Cost Z = K · (Total Demand) is invariant."
  },
  {
    question: "Suppose Debangshu finds two minimum cells: Cell (1, 2) at ₹4 with S_1=30, D_2=50, and Cell (2, 3) at ₹4 with S_2=70, D_3=40. Which cell should be selected?",
    shortAnswer: "Select Cell (2, 3) because it allows an allocation of 40 units (min(70, 40)), whereas Cell (1, 2) only allows 30 units (min(30, 50)).",
    explanation: "Allocation for (1, 2) = min(30, 50) = 30 units. Allocation for (2, 3) = min(70, 40) = 40 units. Under the maximum allocation rule, 40 > 30, so Cell (2, 3) is selected first.",
    hint: "Compare min(30, 50) vs min(70, 40) and pick the larger value.",
    level: "intermediate",
    codeExample: "x_12 = min(30, 50) = 30; x_23 = min(70, 40) = 40; Pick (2, 3) since 40 > 30."
  },
  {
    question: "Why should an analyst cross out only one line if selecting cell (k, l) simultaneously exhausts row k and column l (S_k = D_l)?",
    shortAnswer: "Crossing out both simultaneously removes two lines in one step, creating degeneracy with fewer than m + n - 1 basic variables.",
    explanation: "If both are eliminated at once, the basic variable count will be m + n - 2, which causes MODI optimality evaluation to fail. By eliminating only row k and assigning an infinitesimal zero (ε) in column l before crossing it out, exactly m + n - 1 basic variables are maintained.",
    hint: "Eliminate one line normally, and leave an epsilon placeholder in the other.",
    level: "expert",
    codeExample: "if (S[k] === D[l]) {\n  rowActive[k] = false;\n  assignEpsilon(k_prime, l);\n  colActive[l] = false;\n}"
  },
  {
    question: "How does the selection process behave in a 1 × n (single supplier, multiple destinations) transportation table?",
    shortAnswer: "It simply selects destinations in strictly ascending order of unit cost until the origin supply is fully distributed.",
    explanation: "With only one origin, there are no cross-origin trade-offs. Sorting destination costs ascendingly and allocating greedily produces the mathematically optimal allocation directly in one pass.",
    hint: "A single warehouse serves customers strictly from cheapest delivery route to most expensive.",
    level: "basic",
    codeExample: "destinations.sort((a, b) => a.cost - b.cost).forEach(d => allocate(d));"
  },
  {
    question: "In a 3 × 3 matrix, if the minimum cost cell is unique and located at (2, 2), does the algorithm evaluate any other cells in that step?",
    shortAnswer: "No, once the global unique minimum is confirmed, the algorithm directly executes the allocation on cell (2, 2) without branching.",
    explanation: "The Matrix Minima Method is a deterministic greedy algorithm. With a unique global minimum, no tie-breaking or secondary comparisons are required.",
    hint: "A unique minimum gives an unambiguous direct command to allocate.",
    level: "basic",
    codeExample: "const minCell = findUniqueMin(activeCells);\nallocate(minCell);"
  },
  {
    question: "What is the time complexity of scanning an m × n cost matrix to find the minimum active cell in a single iteration?",
    shortAnswer: "O(m · n) time complexity.",
    explanation: "A standard nested loop iterates over m rows and n columns, checking the active status of each cell. In the worst case, it inspects all m · n elements per step.",
    hint: "Inspecting every cell in a 2D grid takes rows × columns operations.",
    level: "intermediate",
    codeExample: "for(let i=0; i<m; i++) for(let j=0; j<n; j++) if(active(i,j) && c[i][j]<min) { ... }"
  },
  {
    question: "How does scaling the entire cost matrix by a positive constant k (c_ij' = k · c_ij) impact the cell selection sequence?",
    shortAnswer: "It has zero impact on the cell selection sequence; the exact same cells will be chosen in the exact same order.",
    explanation: "Because multiplication by a positive constant k > 0 preserves the order of real numbers (a < b ⇔ ka < kb), the argmin operator returns the identical index (k, l) at every step.",
    hint: "Converting prices from Rupees to Paise does not change which route is cheapest.",
    level: "intermediate",
    codeExample: "argmin(k · C) == argmin(C) for all k > 0."
  },
  {
    question: "How does adding a constant scalar C to all cells (c_ij' = c_ij + C) affect the minimum cell selection?",
    shortAnswer: "The cell selection sequence remains completely unchanged.",
    explanation: "Adding a constant shift preserves order relations (a < b ⇔ a + C < b + C). The relative differences between cells remain invariant, so the same cells are selected in the same order.",
    hint: "A uniform toll surcharge on all roads keeps the cheapest road cheapest.",
    level: "intermediate",
    codeExample: "argmin(C + scalar) == argmin(C)."
  },
  {
    question: "What happens if multiple cells tie for minimum cost and an analyst arbitrarily selects one that yields a smaller allocation volume?",
    shortAnswer: "The resulting solution remains a valid Initial Basic Feasible Solution (IBFS), but its total starting cost Z may be higher.",
    explanation: "Any tie-break choice that respects supply/demand constraints and m+n-1 line eliminations produces a valid basic feasible solution. However, choosing a smaller volume cell at the lowest rate leaves more volume to be shipped at higher rates later.",
    hint: "Any choice yields a legal starting point; the max-volume rule simply yields a cheaper starting point.",
    level: "expert",
    codeExample: "Both branches yield feasible IBFS; max-volume branch typically yields lower Z."
  },
  {
    question: "Why should an operations researcher avoid selecting negative cost cells arbitrarily if they arise from subsidies?",
    shortAnswer: "Negative costs must be selected first in order of their absolute negative magnitude (most negative first) to maximize subsidy capture.",
    explanation: "If government rebates make route (1, 1) cost -₹10/unit and route (2, 2) cost -₹4/unit, the argmin is -₹10. Prioritizing the most negative cost maximizes total financial benefit.",
    hint: "The most negative number is the smallest number on the real number line.",
    level: "intermediate",
    codeExample: "min(-10, -4, 2, 8) = -10 ⇒ Cell with -₹10 is selected first."
  },
  {
    question: "In a transportation problem with 4 origins and 5 destinations, what is the maximum number of cell selections performed before termination?",
    shortAnswer: "At most 8 cell selections (4 + 5 - 1 = 8).",
    explanation: "Each cell selection satisfies at least one row or column constraint. In an m × n problem, exactly m + n - 1 line eliminations are needed, requiring at most m + n - 1 = 8 allocation steps.",
    hint: "Formula: Max cell selections = m + n - 1.",
    level: "basic",
    codeExample: "Max steps = 4 + 5 - 1 = 8 steps."
  },
  {
    question: "When coding Matrix Minima, why is it recommended to track exhausted rows and columns using separate boolean arrays instead of resizing the matrix?",
    shortAnswer: "Resizing or slicing 2D arrays causes costly memory reallocation and corrupts original row/column index mappings needed for solution recording.",
    explanation: "Using `rowActive = [true, ...]` and `colActive = [true, ...]` preserves original indices (i, j) for tracking variables x_ij without memory overhead or index remapping logic.",
    hint: "Keep original coordinates intact so your answers map directly back to the physical factories.",
    level: "intermediate",
    codeExample: "const rowActive = new Array(m).fill(true);\nconst colActive = new Array(n).fill(true);"
  },
  {
    question: "Suppose in Step 3, the minimum cost is ₹5 and occurs at two cells: (1, 3) and (2, 3) in the same column D3. What does this indicate?",
    shortAnswer: "Two different origins can supply destination D3 at the exact same lowest rate; tie-breaking determines which warehouse supplies first.",
    explanation: "Destination D3 can be served with equal efficiency from Origin 1 or Origin 2. Applying the max-volume rule allocates from the warehouse with the larger available stock first.",
    hint: "Both factories offer the same freight rate to the same store.",
    level: "intermediate",
    codeExample: "c_13 = c_23 = ₹5; pick max(min(S_1, D_3), min(S_2, D_3))."
  },
  {
    question: "How does cell selection in Matrix Minima compare with cell selection in the North-West Corner Rule?",
    shortAnswer: "Matrix Minima selects cells dynamically based on global numerical values, whereas NWCR selects cells deterministically based on static spatial position (top-left).",
    explanation: "NWCR always picks (1, 1) first, then moves right to (1, 2) or down to (2, 1). Matrix Minima can jump anywhere in the table to capture the lowest freight rate, completely disregarding geometric grid coordinates.",
    hint: "Economics-driven dynamic jumps vs coordinate-driven rigid steps.",
    level: "basic",
    codeExample: "NWCR: always (i, j) top-left. Matrix Minima: argmin(c_ij) anywhere in table."
  },
  {
    question: "If an origin has S_1 = 100 and a destination has D_2 = 40, and c_12 is the minimum cell, what is the allocated quantity and remaining state?",
    shortAnswer: "Allocate x_12 = 40; Destination D_2 demand becomes 0 (eliminated); Origin S_1 retains 60 units of active supply.",
    explanation: "x_12 = min(100, 40) = 40 units. D_2 is completely satisfied (100% fulfilled) and column 2 is crossed out. S_1 has 100 - 40 = 60 units available for other destinations.",
    hint: "Take min(100, 40) = 40; subtract 40 from both.",
    level: "basic",
    codeExample: "x[1][2] = 40; S[1] = 60; D[2] = 0; colActive[2] = false;"
  },
  {
    question: "What is the danger of blindly choosing the first minimum cell encountered during a row-by-row code search when ties exist?",
    shortAnswer: "It introduces arbitrary bias based on iteration order rather than optimizing immediate cargo volume savings.",
    explanation: "A simple code check `if (cost < minCost)` retains the first occurrence, ignoring whether a subsequent tied cell could move 5× more volume. Always implementing a tie-break check `else if (cost === minCost)` ensures consistent max-volume optimization.",
    hint: "Don't let for-loop order decide your logistics policy; check allocation capacity on ties.",
    level: "expert",
    codeExample: "if (c < min) { min = c; best = [i, j]; } else if (c === min && vol(i,j) > vol(best)) { best = [i, j]; }"
  },
  {
    question: "Under what matrix structure will Matrix Minima make all its cell selections along the main diagonal?",
    shortAnswer: "When diagonal costs are strictly smaller than all off-diagonal costs in every active submatrix (c_ii < c_ij for all j ≠ i).",
    explanation: "If diagonal cells (1, 1), (2, 2), (3, 3) have the smallest rates in the matrix, the algorithm will systematically select them in sequence, creating a diagonal allocation pattern.",
    hint: "Local factory-to-local city routes are always cheaper than cross-regional shipments.",
    level: "intermediate",
    codeExample: "c_11 = ₹1, c_22 = ₹2, c_33 = ₹3 (all other c_ij ≥ ₹10) ⇒ Diagonal allocations."
  },
  {
    question: "Can cell selection in Matrix Minima produce fractional allocations if all initial supplies and demands are integers?",
    shortAnswer: "No, the solution is guaranteed to be entirely integer-valued (Total Unimodularity property).",
    explanation: "Because the constraint coefficient matrix of a transportation problem is totally unimodular and allocations are computed using the min(S_i, D_j) operator on integers, all basic variables x_ij are strictly integers.",
    hint: "Taking minimums and subtractions of whole numbers always produces whole numbers.",
    level: "intermediate",
    codeExample: "S_i, D_j ∈ ℤ⁺ ⇒ x_ij ∈ ℤ⁺ for all allocations."
  },
  {
    question: "How does the selection procedure ensure that no closed loop is created at any step?",
    shortAnswer: "Every cell selection is immediately followed by eliminating the row or column that reached zero capacity, preventing any cycle from forming.",
    explanation: "A cycle in a transportation grid requires at least two allocations in every row and column involved. Since one of the lines containing the newly selected cell is immediately eliminated from future selections, no subsequent cell can reconnect to it to close a cycle.",
    hint: "Eliminating lines prunes the graph, ensuring a tree structure at all times.",
    level: "expert",
    codeExample: "Line elimination guarantees graph G = (V, E) remains a forest/tree without cycles."
  },
  {
    question: "Suppose Susmita is solving a problem with 3 hospitals and 2 oxygen depots. How many active cells does she inspect in Step 1?",
    shortAnswer: "6 active cells (2 rows × 3 columns = 6 cells).",
    explanation: "In Step 1, all 2 supply rows and all 3 destination columns are active. The initial search space is the complete 2 × 3 = 6 cells.",
    hint: "Multiply active rows by active columns: 2 × 3 = 6.",
    level: "basic",
    codeExample: "Active cells in Step 1 = m × n = 2 × 3 = 6."
  },
  {
    question: "In Step 2 of the same 2 × 3 problem, if Column 2 was eliminated in Step 1, how many candidate cells remain to be inspected?",
    shortAnswer: "4 candidate cells (2 rows × 2 remaining columns = 4 cells).",
    explanation: "Eliminating Column 2 leaves 2 rows and 2 active columns (Columns 1 and 3). The active submatrix has size 2 × 2 = 4 cells.",
    hint: "Subtract the eliminated column: 2 rows × (3 - 1) columns = 4 cells.",
    level: "basic",
    codeExample: "Active cells in Step 2 = 2 rows × 2 cols = 4 cells."
  },
  {
    question: "What is the final verification step an operations researcher must perform immediately after all cell selections are complete?",
    shortAnswer: "Verify that all row sums equal S_i, all column sums equal D_j, and total allocations count equals m + n - 1.",
    explanation: "This three-point sanity check confirms feasibility (no unsupplied demand or leftover stock) and non-degeneracy (valid basis of size m + n - 1 for MODI testing).",
    hint: "Check supply totals, demand totals, and the m + n - 1 count.",
    level: "intermediate",
    codeExample: "assert(allocations.length === m + n - 1);\nassert(rowSumsMatch(S));\nassert(colSumsMatch(D));"
  }
];

export default questions;
