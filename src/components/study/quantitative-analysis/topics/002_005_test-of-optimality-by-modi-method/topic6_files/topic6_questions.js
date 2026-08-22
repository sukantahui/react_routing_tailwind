// topic6_questions.js
// 30 Moderate to Expert Questions on Closed Loops in the MODI Method

const questions = [
  {
    question: "What is the formal mathematical definition of a 'Stepping-Stone Closed Loop' in transportation analysis?",
    shortAnswer: "A closed loop is an ordered rectangular polygon consisting of alternating horizontal and vertical line segments whose vertices (turning corners) lie exclusively on occupied basic cells, except for the single entering non-basic cell.",
    explanation: "The loop forms an alternating cycle on the bipartite transportation graph, allowing mass balance conservation when shifting flow into the entering cell.",
    hint: "A closed path of 90-degree horizontal-vertical turns on basic cells.",
    level: "moderate",
    codeExample: "Loop Path: (Enter) -> (Basic_1) -> (Basic_2) -> (Basic_3) -> (Enter)."
  },
  {
    question: "Why is the closed loop guaranteed to be UNIQUE for any chosen entering cell in a non-degenerate basic feasible solution?",
    shortAnswer: "Because the m + n - 1 basic cells form an acyclic spanning tree on the bipartite graph; by graph theory, adding exactly one edge to a spanning tree creates exactly ONE unique fundamental cycle.",
    explanation: "A tree has no cycles. Introducing one non-basic edge closes exactly one loop.",
    hint: "Adding one edge to a spanning tree creates exactly one cycle.",
    level: "expert",
    codeExample: "Theorem: Spanning Tree (m+n-1 edges) + 1 Edge = Exactly 1 Unique Cycle."
  },
  {
    question: "Can a closed loop have an odd number of vertices (e.g., 3, 5, or 7 corners)?",
    shortAnswer: "No, a closed loop MUST always have an EVEN number of vertices (4, 6, 8, etc.) because it alternates strictly between horizontal and vertical moves in a 2D grid.",
    explanation: "Returning to the starting row and column requires an equal number of horizontal and vertical steps, guaranteeing 2k vertices.",
    hint: "Every loop has an even number of corners (4, 6, 8...).",
    level: "moderate",
    codeExample: "Vertices Count = 2k (where k >= 2; e.g. 4, 6, 8 corners)."
  },
  {
    question: "Can a stepping-stone loop skip (jump over) intermediate basic or empty cells without turning on them?",
    shortAnswer: "Yes, loop segments can jump over any number of intermediate basic or empty cells in the same row or column; vertices are formed ONLY where the path makes a 90-degree turn.",
    explanation: "A horizontal or vertical segment simply connects two turning corners across the grid regardless of intervening cells.",
    hint: "You can jump over intermediate cells; only turning corners count as vertices.",
    level: "intermediate",
    codeExample: "Segment: from (1, 1) to (1, 4) jumps over cells (1, 2) and (1, 3)."
  },
  {
    question: "Can a closed loop make a 90-degree turn at an UNOCCUPIED (empty) cell?",
    shortAnswer: "No, every turning corner in the loop MUST be an occupied basic cell, except for the initial starting/ending entering cell.",
    explanation: "Turning at an empty cell violates the basis structure and makes mass balance reallocation impossible.",
    hint: "Turning corners must be occupied basic cells.",
    level: "moderate",
    codeExample: "Rule: forall corners c != start, c in BasicCells."
  },
  {
    question: "Suppose Debangshu in Barrackpore wants to trace a closed loop for entering cell (2, 1). If basic cells are (1, 1), (1, 2), (2, 2), (2, 3), (3, 3), what is the 4-corner loop?",
    shortAnswer: "Loop: (2, 1) ➔ (1, 1) ➔ (1, 2) ➔ (2, 2) ➔ (2, 1).",
    explanation: "Starting at entering cell (2, 1), move vertically to basic cell (1, 1), horizontally to basic cell (1, 2), vertically to basic cell (2, 2), and horizontally back to (2, 1).",
    hint: "(2,1) -> (1,1) -> (1,2) -> (2,2) -> (2,1).",
    level: "moderate",
    codeExample: "Loop: (2,1)[+] -> (1,1)[-] -> (1,2)[+] -> (2,2)[-] -> (2,1)."
  },
  {
    question: "Can a closed loop include diagonal line segments?",
    shortAnswer: "No, diagonal moves are strictly prohibited; every segment must be strictly horizontal (same row) or vertical (same column).",
    explanation: "Transportation constraints operate strictly along rows (origin supply) and columns (destination demand). Diagonal lines violate the one-variable-at-a-time constraint structure.",
    hint: "Strictly 90-degree horizontal and vertical moves only.",
    level: "moderate",
    codeExample: "Prohibited: Diagonal moves (delta_r != 0 and delta_c != 0)."
  },
  {
    question: "What is a 'Complex Loop' (6-corner or 8-corner loop) and when does it occur?",
    shortAnswer: "A complex loop occurs when the entering cell cannot form a simple 4-corner rectangle with basic cells, requiring 6 or more alternating turns through the spanning tree to close the cycle.",
    explanation: "In larger or staggered tableaus, tracing the fundamental cycle requires navigating through 3 or more row-column pairs.",
    hint: "6 or 8 corners when basic cells are not arranged in a simple 2x2 rectangle.",
    level: "expert",
    codeExample: "6-Corner Loop: (Enter) -> (B1) -> (B2) -> (B3) -> (B4) -> (B5) -> (Enter)."
  },
  {
    question: "Suppose Susmita in Ichapur traces a 6-corner loop: (3, 1) ➔ (1, 1) ➔ (1, 3) ➔ (2, 3) ➔ (2, 2) ➔ (3, 2) ➔ (3, 1). How many rows and columns are involved?",
    shortAnswer: "All 3 rows (Rows 1, 2, 3) and all 3 columns (Cols 1, 2, 3) are involved.",
    explanation: "Vertices: Rows 3, 1, 1, 2, 2, 3; Columns 1, 1, 3, 3, 2, 2. Every line is visited twice (once entering, once leaving).",
    hint: "Involves rows 1, 2, 3 and columns 1, 2, 3.",
    level: "expert",
    codeExample: "Lines involved: Rows {1, 2, 3} and Cols {1, 2, 3}."
  },
  {
    question: "Why must every row and column involved in a closed loop contain EXACTLY TWO corner vertices of the loop?",
    shortAnswer: "Because each line must have exactly one incoming segment (+θ) and exactly one outgoing segment (-θ) to preserve the row/column sum constraint (Conservation of Flow).",
    explanation: "+θ - θ = 0 net change across each row and column, keeping total supply S_i and total demand D_j unchanged.",
    hint: "One plus corner and one minus corner per row/column preserves net capacity.",
    level: "expert",
    codeExample: "Conservation of Flow: Delta(Row i) = +θ - θ = 0; Delta(Col j) = +θ - θ = 0."
  },
  {
    question: "What happens if a student attempts to trace a closed loop in a degenerate tableau where only 4 basic cells exist in a 3x3 matrix?",
    shortAnswer: "The loop may be impossible to close because the spanning tree is disconnected into separate components.",
    explanation: "If the entering cell connects to a disconnected sub-tree, no return path exists without an epsilon (ε) bridge edge.",
    hint: "Degeneracy can prevent closing the loop without epsilon.",
    level: "expert",
    codeExample: "Degenerate Basis -> Disconnected Tree -> Path blocked."
  },
  {
    question: "How does placing epsilon (ε) in an independent cell resolve a blocked loop path?",
    shortAnswer: "Epsilon acts as a valid basic corner vertex, completing the missing link in the graph and allowing the closed loop to be traced seamlessly.",
    explanation: "The loop turns at the ε cell just as it would at any regular basic cell.",
    hint: "Epsilon serves as a valid turning corner in the loop.",
    level: "expert",
    codeExample: "Epsilon Cell acts as a corner vertex with allocation value ε."
  },
  {
    question: "Suppose Mamata in Kolkata traces a loop starting at cell (1, 3). Which sign (+ or -) is ALWAYS assigned to the entering cell (1, 3)?",
    shortAnswer: "The PLUS sign (+θ) is ALWAYS assigned to the entering cell.",
    explanation: "The entering cell is currently empty (x_enter = 0) and must receive a positive allocation (+θ) to enter the basis.",
    hint: "The entering cell always gets the plus (+) sign.",
    level: "moderate",
    codeExample: "x_enter_new = 0 + theta = +theta."
  },
  {
    question: "How do the signs alternate around the closed loop?",
    shortAnswer: "In strict alternating order around the perimeter of the loop: (+θ, -θ, +θ, -θ, +θ, -θ...).",
    explanation: "Alternating signs ensure that for every row and column involved, one vertex adds θ and one vertex subtracts θ.",
    hint: "Strictly alternate + and - at consecutive corners.",
    level: "moderate",
    codeExample: "Sign sequence: [ +, -, +, -, +, - ] around the loop."
  },
  {
    question: "Can two consecutive corners along the loop share the SAME sign (e.g. ++ or --)?",
    shortAnswer: "No, having two consecutive pluses or minuses would violate row or column capacity constraints (+θ + θ = +2θ).",
    explanation: "Signs must alternate strictly to maintain row and column capacity sums.",
    hint: "Never place identical signs at consecutive corners.",
    level: "moderate",
    codeExample: "Violation: Row with (+θ, +θ) increases row total by 2θ."
  },
  {
    question: "Suppose Mahima in Barrackpore traces a loop with minus (-) corners at cell (1, 1) with allocation 60 tons and cell (2, 2) with allocation 70 tons. What is the maximum transfer quantity theta (θ)?",
    shortAnswer: "θ = 60 tons ( min(60, 70) = 60 tons ).",
    explanation: "θ is the minimum of the allocations among all basic cells with a minus (-) sign: θ = min(60, 70) = 60 tons.",
    hint: "min(60, 70) = 60.",
    level: "moderate",
    codeExample: "theta = min(60, 70) = 60 tons."
  },
  {
    question: "In the above problem, what happens to the allocation at cell (1, 1) after pivoting with θ = 60?",
    shortAnswer: "Its new allocation becomes 60 - 60 = 0 tons; cell (1, 1) LEAVES the basis and becomes an empty non-basic cell.",
    explanation: "The cell that drops to zero exits the basis, ensuring exactly m + n - 1 basic variables remain.",
    hint: "60 - 60 = 0 -> becomes non-basic.",
    level: "moderate",
    codeExample: "x_11_new = 60 - 60 = 0 (Leaves Basis)."
  },
  {
    question: "In the same problem, what happens to the allocation at cell (2, 2) after pivoting with θ = 60?",
    shortAnswer: "Its new allocation becomes 70 - 60 = 10 tons; cell (2, 2) REMAINS basic with a reduced allocation.",
    explanation: "70 - 60 = 10 > 0, so cell (2, 2) stays in the basis.",
    hint: "70 - 60 = 10.",
    level: "moderate",
    codeExample: "x_22_new = 70 - 60 = 10 tons (Remains Basic)."
  },
  {
    question: "What happens to the allocation at the entering cell (2, 1) after pivoting with θ = 60?",
    shortAnswer: "Its new allocation becomes 0 + 60 = 60 tons; cell (2, 1) ENTERS the basis as a new basic variable.",
    explanation: "The entering cell absorbs the full transfer volume θ = 60.",
    hint: "0 + 60 = 60.",
    level: "moderate",
    codeExample: "x_21_new = 0 + 60 = 60 tons (Enters Basis)."
  },
  {
    question: "What is the systematic algorithm used by computer software to trace the closed loop from an entering cell?",
    shortAnswer: "A Depth-First Search (DFS) or Breadth-First Search (BFS) on the bipartite tree graph to find the unique path between the row node and column node of the entering cell.",
    explanation: "Finding the path between Origin i and Destination j in the basic spanning tree and adding the entering edge (i, j) yields the unique cycle in O(m + n) time.",
    hint: "Tree path search (DFS/BFS) between row i and column j.",
    level: "expert",
    codeExample: "Loop = find_tree_path(row_i, col_j) + [(row_i, col_j)]."
  },
  {
    question: "Suppose Abhronila in Jadavpur wants to verify that her traced loop does NOT violate any demand constraints. How can she double check?",
    shortAnswer: "Sum the new allocations down each column and verify that every column sum exactly matches the original destination demand D_j.",
    explanation: "Since every column has +θ and -θ, the sum remains invariant: Sum x_ij' = Sum x_ij = D_j.",
    hint: "Check column sums after adding and subtracting θ.",
    level: "intermediate",
    codeExample: "Audit: all(sum(x_new[i][j] for i in rows) == Demand[j] for j in cols)."
  },
  {
    question: "Can a closed loop self-intersect (cross over itself) in the tableau?",
    shortAnswer: "Yes, in complex 6-corner or 8-corner loops, horizontal and vertical lines may visually cross in the 2D grid, but they do NOT form a vertex unless a 90-degree turn is made on a basic cell.",
    explanation: "Crossing lines in a 2D layout is a visual artifact; in graph theory, the cycle is simple and planar.",
    hint: "Lines can visually cross, but vertices occur only at 90-degree turns.",
    level: "expert",
    codeExample: "Line crossover is allowed; vertices exist only at turning corners."
  },
  {
    question: "What is the common student mistake when drawing closed loops on paper tableaus?",
    shortAnswer: "Turning at an empty cell or drawing a diagonal line directly back to the start instead of finding the basic corner path.",
    explanation: "Students often get impatient and cut corners diagonally. Every turn must be a 90-degree turn at a basic cell.",
    hint: "Never cut corners diagonally or turn on empty cells.",
    level: "moderate",
    codeExample: "Mistake: Turning at empty cell or taking diagonal shortcut."
  },
  {
    question: "Suppose a loop has three minus (-) corners with allocations 40, 50, and 40. What is θ, and how many cells leave the basis?",
    shortAnswer: "θ = 40; exactly ONE cell leaves the basis (the other tied cell remains in the basis with allocation 0 to prevent degeneracy).",
    explanation: "Dropping both tied cells to empty would reduce the basic variable count to m + n - 2, causing degeneracy. Only one exits.",
    hint: "θ = 40; drop only one cell to empty, keep the other as basic zero.",
    level: "expert",
    codeExample: "θ = min(40, 50, 40) = 40; Drop 1 cell to empty; retain 1 cell with x = 0."
  },
  {
    question: "Why does the closed loop mechanism guarantee that total transportation cost strictly decreases when d_enter < 0?",
    shortAnswer: "Because the net change in total cost is Delta Z = theta * sum_{loop corners} (+/-) c_kl = theta * d_enter, which is strictly negative since theta > 0 and d_enter < 0.",
    explanation: "By the loop duality theorem, the alternating cost sum around the loop equals d_enter exactly.",
    hint: "Delta Z = theta * d_enter < 0.",
    level: "expert",
    codeExample: "Delta Z = theta * (c_enter - c_1 + c_2 - c_3) = theta * d_enter."
  },
  {
    question: "How does tracing closed loops in MODI compare to tracing loops in the Stepping-Stone method?",
    shortAnswer: "In Stepping-Stone, loops must be traced for EVERY non-basic cell to find opportunity costs; in MODI, a loop is traced ONLY ONCE per iteration for the winning entering cell to execute the flow pivot.",
    explanation: "MODI saves massive time by computing evaluations algebraically and tracing a loop only when pivoting.",
    hint: "MODI traces 1 loop per iteration; Stepping-Stone traces (m-1)(n-1) loops.",
    level: "intermediate",
    codeExample: "MODI: 1 loop per iteration vs Stepping-Stone: (m-1)(n-1) loops per pass."
  },
  {
    question: "What is the physical managerial interpretation of a closed loop flow redistribution?",
    shortAnswer: "It represents a coordinated logistics swap: redirecting freight from expensive supplier-customer pairs to cheaper routes while keeping all factory outputs and customer receipts perfectly balanced.",
    explanation: "Suppliers shift dispatch lanes without altering total production or customer delivery totals.",
    hint: "Coordinated freight swap preserving all supply and demand totals.",
    level: "intermediate",
    codeExample: "Managerial Meaning: Reallocating truck dispatches to capture freight savings."
  },
  {
    question: "If an operations team is auditing a solved tableau, how can they quickly confirm that no closed loops exist among the final basic cells?",
    shortAnswer: "By attempting to trace a closed rectangular path exclusively through the occupied cells; if no closed cycle can be formed, the basis is 100% acyclic and linearly independent.",
    explanation: "An acyclic basis guarantees linear independence of the constraint columns.",
    hint: "Try tracing a loop through occupied cells; none must exist.",
    level: "expert",
    codeExample: "Loop Test: isAcyclic(BasicCells) === true."
  },
  {
    question: "What is the golden rule for tracing closed loops in the MODI method?",
    shortAnswer: "'Start at the entering cell (+θ); make ONLY 90° turns on occupied basic cells (-θ, +θ...); find θ = min(minus corners); pivot flow cleanly!'",
    explanation: "This rule encapsulates the entire stepping-stone loop construction and pivoting protocol.",
    hint: "Start at enter (+θ) -> turn on basic cells -> θ = min(minus) -> pivot.",
    level: "moderate",
    codeExample: "Golden Rule: (1) Enter (+θ) -> (2) 90° on Basic -> (3) θ = min(minus) -> (4) Update."
  }
];

export default questions;
