// topic9_questions.js
// 30 Moderate to Expert Questions on Repeated MODI Iterations and Convergence Dynamics

const questions = [
  {
    question: "Why do most practical transportation problems require multiple successive MODI iterations to achieve global optimality?",
    shortAnswer: "Because each simplex pivot moves only to an adjacent extreme point (vertex); if the initial solution is multiple edges away from the optimal vertex, several sequential pivots are required to traverse the polytope.",
    explanation: "Linear programming simplex algorithms visit adjacent vertices along extreme rays until the global minimizer is reached.",
    hint: "Each pivot moves one vertex along the polytope.",
    level: "moderate",
    codeExample: "Iteration Sequence: Vertex_0 → Vertex_1 → Vertex_2 → ... → Vertex_Optimal."
  },
  {
    question: "In the 3x3 Foundry Problem, what is the sequence of total transportation costs across successive MODI iterations starting from NWCR?",
    shortAnswer: "Iteration 0 (NWCR): Z = ₹2,740 ➔ Iteration 1: Z = ₹2,260 ➔ Iteration 2 (Optimal): Z = ₹2,060.",
    explanation: "Cost decreases by ₹480 in iteration 1 and by ₹200 in iteration 2, achieving the minimum of ₹2,060.",
    hint: "₹2,740 → ₹2,260 → ₹2,060.",
    level: "moderate",
    codeExample: "Z_history = [2740, 2260, 2060]; Total Savings = ₹680."
  },
  {
    question: "What is the exact termination criterion that signals the repetition of MODI iterations must STOP?",
    shortAnswer: "When every single non-basic opportunity cost in the current tableau is non-negative: all d_ij = c_ij - (u_i + v_j) >= 0.",
    explanation: "Having all d_ij >= 0 proves that no adjacent vertex can lower the objective cost.",
    hint: "All d_ij >= 0 in the current tableau.",
    level: "moderate",
    codeExample: "Termination Condition: all(d >= 0) === true."
  },
  {
    question: "How does the choice of initial method (NWCR vs Least Cost vs VAM) influence the number of MODI iterations required?",
    shortAnswer: "NWCR typically requires the most iterations (3-5), Least Cost requires fewer (1-3), and VAM requires the fewest (0-1) because VAM starts closest to the optimal basis.",
    explanation: "Better initial heuristics capture more of the optimal basis structure on step 1.",
    hint: "VAM requires fewest iterations (0-1); NWCR requires most (3-5).",
    level: "intermediate",
    codeExample: "Iterations Count: NWCR (3-5) > LCM (1-3) > VAM (0-1)."
  },
  {
    question: "Suppose Debangshu in Barrackpore is on Iteration 2 and calculates new potentials: u'' = [0, 5, 4] and v'' = [0, 14, 3]. If all empty cells evaluate to d'' = [+8, +7, +5, +2], what is his conclusion?",
    shortAnswer: "The algorithm terminates immediately; the solution is globally optimal with certified minimum cost Z = ₹2,060.",
    explanation: "All opportunity costs are strictly positive, proving strict global optimality.",
    hint: "All positive evaluations mean stop and certify optimality.",
    level: "moderate",
    codeExample: "all(d'' > 0) => Terminate immediately."
  },
  {
    question: "What is the maximum theoretical number of iterations a transportation simplex algorithm can perform?",
    shortAnswer: "Bounded by the finite number of basic feasible solutions (vertices on the transportation polytope), which is at most (m*n) choose (m+n-1).",
    explanation: "Because cost strictly decreases at non-degenerate steps, no basis is ever revisited, guaranteeing finite termination.",
    hint: "Bounded by the finite combinatorial number of basic trees.",
    level: "expert",
    codeExample: "Max Vertices <= Combinations(m*n, m+n-1)."
  },
  {
    question: "What happens if an operations researcher forgets to recompute u_i and v_j potentials between iterations and uses the old potentials?",
    shortAnswer: "The opportunity costs d_ij will be calculated incorrectly, leading to false optimality declarations or invalid entering cell choices.",
    explanation: "Each new basis defines a distinct dual potential system.",
    hint: "Potentials must be recomputed for every new basis.",
    level: "moderate",
    codeExample: "Fatal Error: Evaluating Tableau_{k+1} using Potentials_k."
  },
  {
    question: "Suppose Susmita in Ichapur observes that total cost dropped from ₹4,500 to ₹4,100 on Iteration 1, and from ₹4,100 to ₹3,950 on Iteration 2. Is this monotonic convergence?",
    shortAnswer: "Yes, because the total cost strictly decreases at each step: ₹4,500 > ₹4,100 > ₹3,950.",
    explanation: "Monotonic descent is a mathematical hallmark of valid simplex optimization.",
    hint: "Strictly decreasing cost sequence.",
    level: "moderate",
    codeExample: "Z_0 (4500) > Z_1 (4100) > Z_2 (3950) → Monotonic."
  },
  {
    question: "Can an iteration have θ = 0 in the presence of degeneracy?",
    shortAnswer: "Yes, a degenerate pivot occurs when a minus corner already has an allocation of 0, yielding θ = 0; cost remains unchanged while the basis spanning tree is reconfigured.",
    explanation: "Degenerate steps swap basis variables without changing physical flow tonnages.",
    hint: "θ = 0 when a minus corner has zero allocation.",
    level: "expert",
    codeExample: "Degenerate Pivot: theta = 0; Z_{k+1} = Z_k; Basis reconfigured."
  },
  {
    question: "How does Bland's Smallest-Index Rule prevent cycling during repeated degenerate MODI iterations?",
    shortAnswer: "By breaking all entering and leaving candidate ties deterministically using the lowest row and column indices, preventing the algorithm from looping through previously visited bases.",
    explanation: "Bland's rule guarantees finite termination even with infinite degenerate vertices.",
    hint: "Smallest index tie-breaking prevents cycling.",
    level: "expert",
    codeExample: "Bland's Rule: Tie-break using min(row_index, col_index)."
  },
  {
    question: "Suppose Mamata in Kolkata optimizes a 4x4 vaccine matrix. On Iteration 1 she saves ₹300, on Iteration 2 she saves ₹150, and on Iteration 3 she saves ₹50. What is the diminishing returns pattern?",
    shortAnswer: "Early iterations typically capture large gross inefficiencies (₹300), while later iterations perform fine-tuning (₹50) as the basis approaches the global minimum.",
    explanation: "Steepest descent captures the largest marginal gains in early iterations.",
    hint: "Large savings in early iterations, smaller fine-tuning in late iterations.",
    level: "intermediate",
    codeExample: "Savings Pattern: Iter 1 (₹300) > Iter 2 (₹150) > Iter 3 (₹50)."
  },
  {
    question: "In what sequential order should an analyst document multiple iterations in an engineering report or university exam?",
    shortAnswer: "Tableau 0 (IBFS & Initial Audit) ➔ Pivot 1 (Loop & θ) ➔ Tableau 1 (Audit 1) ➔ Pivot 2 (Loop & θ) ➔ Tableau 2 (Final Audit: all d ≥ 0) ➔ Conclusion & Min Cost Z.",
    explanation: "This structured progression demonstrates complete mastery of the optimization pipeline.",
    hint: "Document each tableau, loop pivot, and potential audit in sequence.",
    level: "intermediate",
    codeExample: "Workflow: T_0 → Loop_1 → T_1 → Loop_2 → T_2 → Final Audit."
  },
  {
    question: "Suppose Mahima in Barrackpore has 2 candidate entering cells with d_A = -₹6 and d_B = -₹2 on Iteration 1. Why does picking Cell A instead of Cell B usually reduce the TOTAL number of subsequent iterations?",
    shortAnswer: "Because selecting the steeper gradient (-₹6) makes a larger leap toward the optimal region of the polytope, eliminating unnecessary intermediate vertex visits.",
    explanation: "Dantzig's rule minimizes the path length along the polytope surface.",
    hint: "Steeper gradient eliminates intermediate vertex visits.",
    level: "expert",
    codeExample: "Steepest descent path minimizes total iteration count."
  },
  {
    question: "What is the computational complexity of running K iterations of the MODI method on an m x n matrix?",
    shortAnswer: "O(K * m * n), where solving potentials and evaluating empty cells takes O(m * n) per iteration.",
    explanation: "Each iteration performs O(m+n) tree propagation and O(mn) evaluation subtractions.",
    hint: "Linear in matrix cells per iteration: O(K * m * n).",
    level: "expert",
    codeExample: "Total Runtime = O(K * m * n)"
  },
  {
    question: "Suppose Abhronila in Jadavpur finishes Iteration 1 and finds that only ONE empty cell has d_ij < 0. How many more iterations are guaranteed to remain?",
    shortAnswer: "At least one more iteration is required; that single pivot might reach optimality immediately or uncover new negative evaluations in the reconfigured basis.",
    explanation: "Pivoting that single candidate may satisfy all d_ij >= 0 on the next pass.",
    hint: "At least 1 more iteration; may achieve optimality immediately.",
    level: "moderate",
    codeExample: "1 negative evaluation → Execute 1 pivot → Check if optimal."
  },
  {
    question: "Why should an operations manager never stop after Iteration 1 just because 'the cost already dropped significantly'?",
    shortAnswer: "Because stopping prematurely forfeits additional guaranteed savings in subsequent iterations and leaves the logistics plan sub-optimal.",
    explanation: "True optimality is only achieved when all d_ij >= 0.",
    hint: "Further iterations yield additional savings until all d_ij >= 0.",
    level: "intermediate",
    codeExample: "Stopping at Iter 1 leaves money on the table; continue until all d >= 0."
  },
  {
    question: "In the 3x3 Foundry Problem, what route was activated in Iteration 1, and what route was activated in Iteration 2?",
    shortAnswer: "Iteration 1 activated route (2, 1) [Ichapur ➔ Jadavpur]; Iteration 2 activated route (3, 2) [Kolkata ➔ Salt Lake].",
    explanation: "Sequential pivots systematically activated the cheapest regional lanes.",
    hint: "Iter 1: Cell (2, 1); Iter 2: Cell (3, 2).",
    level: "moderate",
    codeExample: "Pivots: Iter 1 → Enter (2,1); Iter 2 → Enter (3,2)."
  },
  {
    question: "How does tracing the iteration trajectory help logistics auditors verify software algorithms?",
    shortAnswer: "By ensuring that every intermediate tableau satisfies primal feasibility, basis dimension, and monotonic cost decrease (Z_{k+1} < Z_k).",
    explanation: "Auditing intermediate states verifies that the solver does not produce invalid allocations.",
    hint: "Verifies feasibility, basis count, and cost decrease at every step.",
    level: "expert",
    codeExample: "Software Audit: Assert(isFeasible && isMonotonic && isAcyclic)."
  },
  {
    question: "Can an initial solution generated by NWCR take 10 iterations on a 3x3 matrix?",
    shortAnswer: "No, a 3x3 matrix has only (3*3) = 9 cells and 5 basic variables; it typically converges in 2 to 3 iterations.",
    explanation: "The small vertex space limits the maximum number of extreme points.",
    hint: "3x3 problems typically converge in 2-3 iterations.",
    level: "moderate",
    codeExample: "Max typical iterations for 3x3 is 2-3."
  },
  {
    question: "What is the relationship between repeated MODI iterations and the Simplex Method's Pivot Operations?",
    shortAnswer: "Each MODI iteration is mathematically identical to one complete simplex pivot: entering variable selection (most negative reduced cost) + minimum ratio test (θ = min x_minus) + Gaussian basis update.",
    explanation: "MODI is the specialized, highly optimized network simplex algorithm.",
    hint: "Identical to 1 full pivot step in the Simplex algorithm.",
    level: "expert",
    codeExample: "MODI Iteration === Network Simplex Pivot Step."
  },
  {
    question: "Suppose Susmita finds that on Iteration 2, the most negative evaluation is d_32 = -₹2, and the loop allows θ = 100 tons. What is the cost reduction on Iteration 2?",
    shortAnswer: "₹200 reduction ( 100 tons * ₹2 = ₹200 ).",
    explanation: "Delta Z = 100 * (-2) = -₹200.",
    hint: "100 * 2 = 200.",
    level: "moderate",
    codeExample: "Delta Z = 100 * (-2) = -₹200"
  },
  {
    question: "If an initial cost is ₹10,000 and two iterations save ₹800 and ₹400 respectively before reaching optimality, what is the final optimal cost?",
    shortAnswer: "₹8,800 ( ₹10,000 - ₹800 - ₹400 = ₹8,800 ).",
    explanation: "10000 - 1200 = ₹8,800.",
    hint: "10000 - 800 - 400 = 8800.",
    level: "moderate",
    codeExample: "Z_opt = 10000 - 800 - 400 = ₹8,800"
  },
  {
    question: "Why does the MODI method never revisit a previously evaluated basis during non-degenerate iterations?",
    shortAnswer: "Because every non-degenerate pivot strictly lowers the total cost Z, and a previous basis with higher cost Z can never be reached again.",
    explanation: "Strictly decreasing Lyapunov function on a finite state space guarantees no cycles.",
    hint: "Strict cost decrease prevents returning to higher-cost bases.",
    level: "expert",
    codeExample: "No basis cycling: Z(Basis_new) < Z(Basis_old)."
  },
  {
    question: "Suppose Mamata in Kolkata compares 3 methods on the same matrix: NWCR took 3 iterations, LCM took 2 iterations, and VAM took 0 iterations. Which initial method was superior?",
    shortAnswer: "VAM was superior because it achieved global optimality immediately on step 1 with zero subsequent iterations.",
    explanation: "VAM's penalty-guided heuristic captured the exact optimal basis directly.",
    hint: "VAM is superior because it required 0 iterations.",
    level: "moderate",
    codeExample: "Superiority: VAM (0 iter) > LCM (2 iter) > NWCR (3 iter)."
  },
  {
    question: "What is the recommended layout for tracking intermediate potentials across iterations?",
    shortAnswer: "Annotate potentials clearly as u^(0), v^(0) for Iteration 0; u^(1), v^(1) for Iteration 1; and u^(2), v^(2) for Iteration 2.",
    explanation: "Superscript iteration indices prevent confusing potentials across different steps.",
    hint: "Use superscript iteration indices: u^(0), u^(1), u^(2).",
    level: "intermediate",
    codeExample: "Notation: u^(k) and v^(k) for iteration k."
  },
  {
    question: "Can an empty cell that was evaluated as positive in Iteration 0 become negative in Iteration 1?",
    shortAnswer: "Yes, because the basis changed, altering the dual potential field (u and v), which can cause previously positive non-basic cells to become negative entering candidates in later iterations.",
    explanation: "Changing node potentials shifts the relative opportunity cost landscape.",
    hint: "New dual potentials can make previously positive cells negative.",
    level: "expert",
    codeExample: "Opportunity landscape shifts: d_ij^(0) > 0 does NOT imply d_ij^(1) > 0."
  },
  {
    question: "What is the final milestone in the MODI iteration pipeline?",
    shortAnswer: "Calculating and certifying the Final Minimum Transportation Cost in Indian Rupees (₹) and stating that all d_ij >= 0.",
    explanation: "The final cost report concludes the optimization process.",
    hint: "Certify final minimum cost Z and confirm all d_ij >= 0.",
    level: "intermediate",
    codeExample: "Milestone: 'Certified Global Minimum Cost Z = ₹2,060.'"
  },
  {
    question: "Why is mastering repeated MODI iterations essential for operations researchers in West Bengal?",
    shortAnswer: "Because industrial logistics problems across Kolkata, Barrackpore, and Howrah involve complex multi-depot networks that require systematic multi-iteration optimization to achieve maximum cost leadership.",
    explanation: "Real-world supply chains require robust iterative optimization tools.",
    hint: "Enables solving complex multi-depot industrial logistics networks.",
    level: "intermediate",
    codeExample: "Industrial Application: Multi-depot supply chain cost leadership."
  },
  {
    question: "What is the ultimate golden rule for repeated MODI iterations?",
    shortAnswer: "'Evaluate tableau (d_ij); if any d < 0, pivot closed loop to get Tableau_{k+1}; recompute potentials and re-evaluate; repeat until all d >= 0, then certify the global minimum!'",
    explanation: "This complete rule captures the entire algorithmic loop of the MODI method.",
    hint: "Evaluate → Pivot → Update → Recompute → Repeat until all d >= 0.",
    level: "moderate",
    codeExample: "Golden Rule: while(any(d < 0)) { Pivot(); Recompute(); } return CertifiedOptimal;"
  }
];

export default questions;
