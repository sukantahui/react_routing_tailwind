// topic6_questions.js
// 30 Moderate to Expert Questions on Comparison with North-West Corner Rule

const questions = [
  {
    question: "What is the primary philosophical difference between the North-West Corner Rule (NWCR) and the Matrix Minima Method?",
    shortAnswer: "NWCR is a purely spatial geometric algorithm (position-driven), while Matrix Minima is an economic optimization heuristic (cost-driven).",
    explanation: "NWCR traverses the tableau mechanically from cell (1, 1) down to cell (m, n) without ever looking at the unit freight rates c_ij. In contrast, Matrix Minima scans the entire cost matrix globally and allocates to the lowest freight rate first.",
    hint: "Position-based grid steps vs rate-based economic choices.",
    level: "basic",
    codeExample: "NWCR: select (top_left) vs Matrix Minima: select argmin(c_ij)."
  },
  {
    question: "Why is the North-West Corner Rule considered 'cost-blind'?",
    shortAnswer: "Because its cell selection sequence is completely independent of the numbers in the cost matrix C.",
    explanation: "Even if cell (1, 1) costs ₹10,000/unit and cell (1, 2) costs ₹1/unit, NWCR will allocate all possible volume to (1, 1) first simply because it sits at the top-left index.",
    hint: "Changing all the cost numbers in the table has zero impact on NWCR allocations.",
    level: "basic",
    codeExample: "NWCR allocations remain identical regardless of cost matrix values."
  },
  {
    question: "How does the Initial Basic Feasible Solution cost from Matrix Minima typically compare with that of NWCR?",
    shortAnswer: "Matrix Minima produces a significantly lower initial cost, typically saving 25% to 50% compared to NWCR.",
    explanation: "By actively capturing the lowest available rates in each row and column, Matrix Minima constructs an initial solution that starts much closer to the true global optimum.",
    hint: "Cost-aware selection drastically suppresses the starting freight bill.",
    level: "intermediate",
    codeExample: "Z(Matrix Minima) << Z(NWCR) in virtually all practical problems."
  },
  {
    question: "How does the choice of IBFS method impact the subsequent MODI (Modified Distribution) optimization phase?",
    shortAnswer: "A better starting solution (Matrix Minima) requires far fewer simplex iterations/loops (typically 1–3 iterations) compared to NWCR (often 6–12 iterations).",
    explanation: "Because Matrix Minima starts with a basis that is already near-optimal, fewer non-basic cells will have negative net evaluations (Δ_ij < 0), requiring far fewer closed-loop pivots to reach optimality.",
    hint: "A better starting point means less travel time to the destination.",
    level: "intermediate",
    codeExample: "NWCR: 8 MODI loops → Matrix Minima: 1 MODI loop → Optimal solution."
  },
  {
    question: "In Debangshu's fasteners distribution problem, what is the exact cost comparison between NWCR and Matrix Minima?",
    shortAnswer: "NWCR Cost = ₹670; Matrix Minima Cost = ₹470; Matrix Minima saves ₹200 (29.8% cost reduction).",
    explanation: "NWCR allocates arbitrarily across the top-left cells, forcing shipments onto the expensive ₹8 and ₹6 routes. Matrix Minima prioritizes the ₹3 and ₹4 routes, reducing the initial bill to ₹470.",
    hint: "₹670 vs ₹470 (Savings = ₹200).",
    level: "basic",
    codeExample: "Savings = ₹670 - ₹470 = ₹200 (29.8%)."
  },
  {
    question: "In Mamata's FMCG distribution problem, what is the exact cost comparison between NWCR and Matrix Minima?",
    shortAnswer: "NWCR Cost = ₹840; Matrix Minima Cost = ₹490; Matrix Minima saves ₹350 (41.7% cost reduction).",
    explanation: "NWCR commits crates to expensive retail paths without regard to local factory proximity. Matrix Minima locks in the ₹1, ₹2, and ₹3 routes, saving ₹350 immediately.",
    hint: "₹840 vs ₹490 (Savings = ₹350).",
    level: "basic",
    codeExample: "Savings = ₹840 - ₹490 = ₹350 (41.7%)."
  },
  {
    question: "In Susmita's healthcare oxygen logistics, what is the exact cost comparison between NWCR and Matrix Minima?",
    shortAnswer: "NWCR Cost = ₹2,030; Matrix Minima Cost = ₹1,470; Matrix Minima saves ₹560 (27.6% cost reduction).",
    explanation: "NWCR allocates 100 cylinders to Jadavpur @ ₹6 and 20 @ ₹11, then 130 to Ichapur @ ₹5. Matrix Minima allocates 130 @ ₹5, 100 @ ₹6, and only 20 @ ₹11, saving ₹560.",
    hint: "₹2,030 vs ₹1,470 (Savings = ₹560).",
    level: "basic",
    codeExample: "Savings = ₹2,030 - ₹1,470 = ₹560 (27.6%)."
  },
  {
    question: "In Abhronila & Mahima's courier locker network, what is the exact cost comparison between NWCR and Matrix Minima?",
    shortAnswer: "NWCR Cost = ₹630; Matrix Minima Cost = ₹400; Matrix Minima saves ₹230 (36.5% cost reduction).",
    explanation: "NWCR incurs heavy costs by allocating through (1, 1) @ ₹8 first. Matrix Minima selects (2, 1) @ ₹3, (1, 2) @ ₹4, and (2, 3) @ ₹5, saving ₹230.",
    hint: "₹630 vs ₹400 (Savings = ₹230).",
    level: "basic",
    codeExample: "Savings = ₹630 - ₹400 = ₹230 (36.5%)."
  },
  {
    question: "What is the computational time complexity of the North-West Corner Rule versus the Matrix Minima Method?",
    shortAnswer: "NWCR runs in O(m + n) time, while naive Matrix Minima runs in O((m + n)mn) time (or O(mn log(mn)) with a Min-Heap).",
    explanation: "NWCR simply steps along the diagonal without matrix searching, taking linear O(m+n) time. Matrix Minima scans the 2D active matrix at each step, requiring more operations but delivering a vastly superior solution.",
    hint: "NWCR is faster to compute by hand, but Matrix Minima produces a much cheaper answer.",
    level: "intermediate",
    codeExample: "NWCR: O(m + n) vs Matrix Minima: O(mn log(mn))."
  },
  {
    question: "How do NWCR and Matrix Minima handle prohibited routes (cells with cost M, where M → ∞)?",
    shortAnswer: "Matrix Minima automatically avoids prohibited cells (since M is never the minimum), while NWCR might blindly allocate to a prohibited cell if it sits at the top-left.",
    explanation: "Because NWCR is cost-blind, it cannot avoid Big-M cells located in early indices. Matrix Minima naturally filters Big-M routes because it only selects minimum cost cells.",
    hint: "NWCR cannot see Big-M penalty values; Matrix Minima sees and avoids them.",
    level: "intermediate",
    codeExample: "NWCR might allocate to cell (1, 1) even if c_11 = M; Matrix Minima never will."
  },
  {
    question: "Do both NWCR and Matrix Minima guarantee a non-degenerate basic feasible solution with m + n - 1 allocations?",
    shortAnswer: "Yes, both methods eliminate one line per allocation step and guarantee exactly m + n - 1 basic variables when standard degeneracy rules (ε) are applied.",
    explanation: "Both algorithms adhere to the same structural line elimination mechanics, ensuring an acyclic spanning tree basis of size m + n - 1.",
    hint: "Both produce valid basic feasible solutions of the same mathematical dimension.",
    level: "basic",
    codeExample: "Both satisfy: allocations.length === m + n - 1 without closed loops."
  },
  {
    question: "Under what rare circumstance will Matrix Minima produce the exact same solution and cost as NWCR?",
    shortAnswer: "When the cost matrix happens to have its minimum elements ordered strictly along the top-left to bottom-right trajectory of NWCR.",
    explanation: "If the smallest available rate always happens to reside at the active top-left corner, Matrix Minima will select the identical cells and quantities as NWCR.",
    hint: "When cheapest cost alignment accidentally matches geometric coordinate alignment.",
    level: "expert",
    codeExample: "If c_11 < c_12 < ... and c_11 < c_21 < ..., the allocation sequences coincide."
  },
  {
    question: "Why is the North-West Corner Rule still taught in university operations research courses if Matrix Minima is superior?",
    shortAnswer: "For pedagogical clarity: NWCR introduces the concept of basic feasible solutions, table mechanics, and line elimination without arithmetic distractions.",
    explanation: "NWCR is the simplest possible constructive algorithm, making it ideal for teaching the concepts of supply-demand balancing and basis formation before introducing cost-optimization heuristics.",
    hint: "It is the simplest stepping stone to understand transportation tableau mechanics.",
    level: "basic",
    codeExample: "Pedagogical ladder: NWCR (learn structure) → Matrix Minima (add cost) → VAM (add penalty) → MODI (optimize)."
  },
  {
    question: "Why do enterprise supply chain software systems never use the North-West Corner Rule for initial dispatch?",
    shortAnswer: "Because starting with an arbitrary, high-cost plan wastes CPU cycles on unnecessary simplex iterations and risks poor performance on large matrices.",
    explanation: "In real-world networks with thousands of nodes, starting from NWCR requires excessive pivot loops to unwind poor initial allocations. Matrix Minima or VAM is standard.",
    hint: "Commercial logistics cannot afford the computational waste of a bad starting plan.",
    level: "intermediate",
    codeExample: "Production rule: Always initialize LP solver with cost-aware heuristic basis."
  },
  {
    question: "How does the sensitivity to matrix row/column permutations differ between NWCR and Matrix Minima?",
    shortAnswer: "NWCR is highly sensitive to row/column ordering (reordering changes allocations completely), whereas Matrix Minima is invariant to permutations.",
    explanation: "Swapping row 1 and row 2 alters the NWCR top-left starting cell, producing a completely different shipping plan. Matrix Minima scans globally for argmin(c_ij), so row/column permutations have zero effect on cell selection.",
    hint: "Permuting rows changes grid coordinates but does not change global minimum cost values.",
    level: "expert",
    codeExample: "MatrixMinima(Permute(C)) === Permute(MatrixMinima(C)); NWCR(Permute(C)) !== Permute(NWCR(C))."
  },
  {
    question: "What is the 'stepping-stone distance' from an IBFS to the optimal solution, and how does it compare between methods?",
    shortAnswer: "The number of basis exchange loops needed to reach optimality; NWCR has a large distance, while Matrix Minima has a very short distance.",
    explanation: "Because Matrix Minima already occupies mostly optimal or near-optimal cells, only a few basis pivots are required to eliminate remaining negative dual evaluations.",
    hint: "Distance measures how many loop adjustments are required to achieve optimality.",
    level: "intermediate",
    codeExample: "Pivot Distance: NWCR (6–10 pivots) vs Matrix Minima (0–2 pivots)."
  },
  {
    question: "How do tie-breaking rules differ between NWCR and Matrix Minima?",
    shortAnswer: "NWCR has zero cost ties because it only looks at position (1, 1); Matrix Minima uses multi-tier tie-breaking (max volume rule) when duplicate minimum costs occur.",
    explanation: "NWCR never needs to break cost ties because it ignores costs. Matrix Minima requires explicit tie-breaking heuristics when multiple cells share the minimum rate.",
    hint: "Position-based traversal has no ties; cost-based search frequently has duplicate rates.",
    level: "basic",
    codeExample: "Matrix Minima tie-breaker: argmax(min(S_i, D_j)) on duplicate costs."
  },
  {
    question: "Can NWCR ever accidentally produce a lower total cost than Matrix Minima on a specific problem?",
    shortAnswer: "In rare pathological matrices, a greedy choice in Matrix Minima might trigger an extreme downstream bottleneck that happens to be avoided by NWCR's blind steps.",
    explanation: "Because Matrix Minima is myopic (greedy without penalty lookahead), a pathological cost matrix can force its later steps into high-cost cells. However, in 99%+ of practical applications, Matrix Minima significantly outperforms NWCR.",
    hint: "Greedy algorithms can occasionally fall into downstream traps on extreme counter-examples.",
    level: "expert",
    codeExample: "Counter-example: Step 1 saves ₹1, but Step 3 forces ₹1000 penalty due to exhausted local stock."
  },
  {
    question: "How does the memory footprint compare between NWCR and Matrix Minima?",
    shortAnswer: "Both have identical memory footprints of O(m · n) to store the cost matrix and allocation tables.",
    explanation: "Both algorithms operate on the same m × n transportation tableau with m supply and n demand auxiliary vectors.",
    hint: "Both store the same 2D grid and 1D capacity arrays.",
    level: "basic",
    codeExample: "Space Complexity: O(mn) for both."
  },
  {
    question: "What happens when an unbalanced problem is balanced with a ₹0 dummy column in NWCR vs Matrix Minima?",
    shortAnswer: "NWCR allocates to the dummy column only at the very end (rightmost column), while Matrix Minima evaluates dummy cells immediately (since ₹0 is the minimum).",
    explanation: "Because the dummy column sits at column n, NWCR reaches it last. Matrix Minima identifies ₹0 as the lowest numerical rate and evaluates it right away.",
    hint: "NWCR hits the rightmost column last; Matrix Minima sees ₹0 as the cheapest rate immediately.",
    level: "intermediate",
    codeExample: "NWCR dummy allocation: Step m+n-1. Matrix Minima dummy allocation: Step 1."
  },
  {
    question: "Why does Matrix Minima require fewer arithmetic calculations in MODI than NWCR?",
    shortAnswer: "Because Matrix Minima has fewer non-basic cells with Δ_ij < 0, eliminating the need to construct multiple complex closed stepping-stone loops.",
    explanation: "Constructing closed loops, finding the minimum departing variable, and redistributing flow (θ) is computationally heavy. Minimizing the number of loops saves substantial effort.",
    hint: "Fewer negative net evaluations mean fewer loop shifts.",
    level: "intermediate",
    codeExample: "Negative Δ_ij count: NWCR has 4–8 negative cells; Matrix Minima has 0–1 negative cells."
  },
  {
    question: "If Susmita's healthcare board requires an emergency allocation plan in under 30 seconds by hand, which method should she use?",
    shortAnswer: "Matrix Minima, because it takes only a minute to scan for lowest costs by hand and saves thousands of rupees over NWCR.",
    explanation: "Matrix Minima is only slightly more demanding than NWCR on small tables (2×2 or 2×3), but delivers immediate financial savings that justify the extra 30 seconds of inspection.",
    hint: "A few extra seconds of scanning saves large amounts of money.",
    level: "basic",
    codeExample: "Time: 45 seconds; Savings: ₹560 (27.6%)."
  },
  {
    question: "How does the average unit freight rate (Z / Total Flow) differ between NWCR and Matrix Minima across the 4 case studies?",
    shortAnswer: "Matrix Minima consistently achieves an average freight rate that is 25% to 42% lower per unit than NWCR across all scenarios.",
    explanation: "In Fasteners: ₹3.92 vs ₹5.58/ton; FMCG: ₹2.45 vs ₹4.20/crate; Oxygen: ₹5.88 vs ₹8.12/cyl; E-commerce: ₹4.00 vs ₹6.30/parcel.",
    hint: "Compare unit rates across all 4 industrial scenarios.",
    level: "basic",
    codeExample: "Fasteners: ₹3.92 vs ₹5.58; FMCG: ₹2.45 vs ₹4.20; Oxygen: ₹5.88 vs ₹8.12; Courier: ₹4.00 vs ₹6.30."
  },
  {
    question: "What is the structural comparison table between NWCR and Matrix Minima on key parameters?",
    shortAnswer: "Selection driver (Position vs Cost), Cost-awareness (Blind vs Full), Optimality gap (Large vs Small), Complexity (O(m+n) vs O(mn log(mn))).",
    explanation: "This 4-point comparison encapsulates the fundamental trade-off between trivial execution speed and economic solution quality.",
    hint: "Review the standard multi-parameter comparison rubric.",
    level: "intermediate",
    codeExample: "Table: Traversal, Awareness, Quality, Speed, Industrial Use."
  },
  {
    question: "Why does the North-West Corner Rule frequently assign shipments to the most expensive cells in a matrix?",
    shortAnswer: "Because it makes allocation decisions without checking whether cell (i, j) is cheap or expensive, stumbling into high rates by pure positional coincidence.",
    explanation: "If high rates happen to sit in early rows or columns, NWCR fills them blindly, transferring large quantities into high-freight channels.",
    hint: "Positional traversal has no mechanism to avoid expensive cells.",
    level: "basic",
    codeExample: "NWCR allocating 50 units @ ₹15 when an alternative route costs ₹2."
  },
  {
    question: "How does Vogel's Approximation Method (VAM) fit into the comparison between NWCR and Matrix Minima?",
    shortAnswer: "VAM sits above Matrix Minima: NWCR (No cost look) < Matrix Minima (Lowest cost look) < VAM (Penalty difference look).",
    explanation: "While Matrix Minima looks at absolute minimum costs, VAM looks at opportunity penalties, providing an even better IBFS at the expense of higher manual calculation complexity.",
    hint: "The three IBFS methods form a hierarchy of cost intelligence.",
    level: "intermediate",
    codeExample: "Hierarchy: NWCR (Basic) → Matrix Minima (Good) → VAM (Advanced)."
  },
  {
    question: "What happens if all entries in the cost matrix are identical (e.g. all c_ij = ₹4)?",
    shortAnswer: "Both NWCR and Matrix Minima will produce valid basic feasible solutions with the exact same total transportation cost Z.",
    explanation: "When costs are uniform, total freight is mathematically constant for all feasible solutions, neutralizing the economic advantage of Matrix Minima.",
    hint: "Uniform costs make all feasible routing patterns cost the exact same amount.",
    level: "basic",
    codeExample: "c_ij = ₹4 ⇒ Z_NWCR = Z_MatrixMinima = ₹4 · TotalFlow."
  },
  {
    question: "Why should an operations researcher never present an NWCR solution to corporate executive leadership as a final shipping plan?",
    shortAnswer: "Because NWCR is an academic construct that leaves tens of thousands of rupees in avoidable freight waste on the table.",
    explanation: "Presenting a cost-blind solution when simple heuristics like Matrix Minima can cut logistics bills by 30%+ is commercially unacceptable.",
    hint: "Executive leadership demands cost-effective operations, not blind geometric paths.",
    level: "basic",
    codeExample: "Executive presentation: Always present Matrix Minima or MODI-optimized plans."
  },
  {
    question: "How does the concept of 'regret' explain why Matrix Minima beats NWCR?",
    shortAnswer: "Matrix Minima eliminates regret on the cheapest routes by capturing them immediately, whereas NWCR ignores regret entirely.",
    explanation: "Capturing the best available rates prevents paying high freight surcharges on those specific shipment quantities.",
    hint: "Locking in the best deals leaves fewer expensive routes to worry about.",
    level: "intermediate",
    codeExample: "Economic regret is minimized by capturing zero-opportunity-cost cells first."
  },
  {
    question: "What is the single most important summary sentence comparing NWCR and Matrix Minima?",
    shortAnswer: "North-West Corner Rule prioritizes positional convenience; Matrix Minima Method prioritizes economic cost reduction.",
    explanation: "This fundamental distinction explains why Matrix Minima is the standard starting heuristic in applied transportation modeling.",
    hint: "Convenience vs Economics.",
    level: "basic",
    codeExample: "NWCR = Spatial Traversal; Matrix Minima = Cost Minimization."
  }
];

export default questions;
