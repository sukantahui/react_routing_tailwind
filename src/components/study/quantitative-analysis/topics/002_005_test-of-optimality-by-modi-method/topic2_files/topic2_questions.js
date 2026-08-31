// topic2_questions.js
// 30 Moderate to Expert Questions on u-v Variables (Dual Multipliers & Shadow Prices) in Transportation Problems

const questions = [
  {
    question: "What are the u_i and v_j variables in the context of the Linear Programming dual formulation of a transportation problem?",
    shortAnswer: "u_i and v_j are the dual variables (Lagrange multipliers / shadow prices) corresponding to the origin supply constraints and destination demand constraints respectively.",
    explanation: "In linear programming duality, each primal constraint has an associated dual variable. u_i measures the marginal economic value of having one additional unit of supply at origin i, while v_j measures the marginal value of delivering one additional unit to destination j.",
    hint: "Dual variables corresponding to supply rows and demand columns.",
    level: "moderate",
    codeExample: "Dual LP: Maximize sum(S_i * u_i) + sum(D_j * v_j) subject to u_i + v_j <= c_ij."
  },
  {
    question: "What fundamental equation links the u_i and v_j variables to the unit cost c_ij for every basic (occupied) cell?",
    shortAnswer: "u_i + v_j = c_ij for all basic cells (i, j).",
    explanation: "By the Complementary Slackness Theorem of Linear Programming, whenever a primal variable is basic (x_ij > 0), the corresponding dual constraint must hold with strict equality: u_i + v_j = c_ij.",
    hint: "u_i plus v_j equals unit cost c_ij.",
    level: "moderate",
    codeExample: "Complementary Slackness: x_ij > 0 => u_i + v_j = c_ij"
  },
  {
    question: "How many unknown potentials exist in an m x n transportation matrix, and how many basic equations are available to solve them?",
    shortAnswer: "There are m + n unknown potentials (m row potentials u_1..u_m and n column potentials v_1..v_n) and exactly m + n - 1 independent basic equations.",
    explanation: "An m x n tableau has m + n linear constraints, but because total supply equals total demand, one constraint is redundant. A non-degenerate basis has m + n - 1 occupied cells, giving m + n - 1 equations.",
    hint: "Unknowns = m + n; Equations = m + n - 1.",
    level: "moderate",
    codeExample: "Unknowns: m + n; Equations: m + n - 1; Degrees of freedom = 1."
  },
  {
    question: "Why must one potential be assigned an arbitrary reference value (such as u_1 = 0) before solving the system of equations?",
    shortAnswer: "Because the system has m + n unknowns and only m + n - 1 equations (one degree of freedom); setting one variable anchors the relative potential field.",
    explanation: "Just as electrical potential requires a chosen 'ground' reference (0V), the dual potentials require a reference datum to determine unique relative values.",
    hint: "One degree of freedom requires an arbitrary anchor reference.",
    level: "expert",
    codeExample: "Datum Assignment: Set u_1 = 0 → System rank restored → Solve remaining m+n-1 variables."
  },
  {
    question: "What is the recommended operational heuristic for choosing WHICH potential to set to zero?",
    shortAnswer: "Set u_i = 0 for the row (or v_j = 0 for the column) that contains the HIGHEST number of allocated basic cells.",
    explanation: "Anchoring the row/column with the most allocations allows the greatest number of intersecting column/row potentials to be computed immediately in step 1, minimizing propagation chains.",
    hint: "Pick the row or column containing the most basic cells.",
    level: "intermediate",
    codeExample: "Best Practice: anchor_index = argmax(count_of_basic_cells_per_line)."
  },
  {
    question: "Are the dual potentials u_i and v_j restricted to positive values, or can they be negative or zero?",
    shortAnswer: "u_i and v_j are UNRESTRICTED in sign; they can assume positive, negative, or zero values.",
    explanation: "Because the primal transportation constraints are strict equalities (Sum x_ij = S_i and Sum x_ij = D_j), the corresponding dual variables are unrestricted in sign.",
    hint: "Dual variables of equality constraints are unrestricted in sign.",
    level: "moderate",
    codeExample: "u_i in (-infinity, +infinity), v_j in (-infinity, +infinity)."
  },
  {
    question: "What is the 'Invariance Property' of the u-v variables with respect to non-basic opportunity costs d_ij?",
    shortAnswer: "If a constant k is added to all u_i (u_i' = u_i + k) and subtracted from all v_j (v_j' = v_j - k), the sum (u_i' + v_j') is unchanged, and all opportunity costs d_ij = c_ij - (u_i' + v_j') remain IDENTICAL.",
    explanation: "This mathematical property guarantees that the choice of which variable is set to 0 has zero effect on the final optimality test or entering cell selection.",
    hint: "(u_i + k) + (v_j - k) = u_i + v_j.",
    level: "expert",
    codeExample: "Proof: d_ij' = c_ij - (u_i + k + v_j - k) = c_ij - (u_i + v_j) = d_ij."
  },
  {
    question: "Suppose Debangshu in Barrackpore has basic cell (1, 2) with unit cost c_12 = ₹14. If u_1 = 0, what is v_2?",
    shortAnswer: "v_2 = ₹14 ( u_1 + v_2 = c_12 => 0 + v_2 = 14 => v_2 = 14 ).",
    explanation: "From equation u_1 + v_2 = c_12: 0 + v_2 = 14 => v_2 = 14.",
    hint: "0 + v_2 = 14.",
    level: "moderate",
    codeExample: "v_2 = c_12 - u_1 = 14 - 0 = 14"
  },
  {
    question: "Continuing from above, if cell (2, 2) is also basic with unit cost c_22 = ₹19 and v_2 = 14, what is u_2?",
    shortAnswer: "u_2 = ₹5 ( u_2 + v_2 = c_22 => u_2 + 14 = 19 => u_2 = 5 ).",
    explanation: "From equation u_2 + v_2 = c_22: u_2 + 14 = 19 => u_2 = 19 - 14 = 5.",
    hint: "19 - 14 = 5.",
    level: "moderate",
    codeExample: "u_2 = c_22 - v_2 = 19 - 14 = 5"
  },
  {
    question: "Continuing further, if cell (2, 1) is basic with c_21 = ₹5 and u_2 = 5, what is v_1?",
    shortAnswer: "v_1 = ₹0 ( u_2 + v_1 = c_21 => 5 + v_1 = 5 => v_1 = 0 ).",
    explanation: "From equation u_2 + v_1 = c_21: 5 + v_1 = 5 => v_1 = 5 - 5 = 0.",
    hint: "5 - 5 = 0.",
    level: "moderate",
    codeExample: "v_1 = c_21 - u_2 = 5 - 5 = 0"
  },
  {
    question: "Suppose cell (3, 1) is basic with c_31 = ₹11 and v_1 = 0. What is u_3?",
    shortAnswer: "u_3 = ₹11 ( u_3 + v_1 = c_31 => u_3 + 0 = 11 => u_3 = 11 ).",
    explanation: "From equation u_3 + v_1 = c_31: u_3 + 0 = 11 => u_3 = 11.",
    hint: "11 - 0 = 11.",
    level: "moderate",
    codeExample: "u_3 = c_31 - v_1 = 11 - 0 = 11"
  },
  {
    question: "Suppose cell (3, 3) is basic with c_33 = ₹7 and u_3 = 11. What is v_3?",
    shortAnswer: "v_3 = -₹4 ( u_3 + v_3 = c_33 => 11 + v_3 = 7 => v_3 = 7 - 11 = -4 ).",
    explanation: "From equation u_3 + v_3 = c_33: 11 + v_3 = 7 => v_3 = 7 - 11 = -4. Notice that v_3 is a negative potential.",
    hint: "7 - 11 = -4.",
    level: "moderate",
    codeExample: "v_3 = c_33 - u_3 = 7 - 11 = -4"
  },
  {
    question: "Why does the sequential propagation of u_i and v_j values always succeed without circular contradictions in a valid IBFS?",
    shortAnswer: "Because the m + n - 1 basic cells form an acyclic spanning tree on the bipartite graph, guaranteeing a unique topological path to every vertex without loops.",
    explanation: "In graph theory, a spanning tree with m + n vertices has no cycles, ensuring that propagating potentials along edges solves every node uniquely without contradiction.",
    hint: "The basis forms a spanning tree with zero closed cycles.",
    level: "expert",
    codeExample: "Spanning Tree Property: 1 connected component + 0 cycles => unique propagation."
  },
  {
    question: "What happens during u-v computation if the initial basic solution is degenerate (contains only 4 basic cells in a 3x3 matrix)?",
    shortAnswer: "The spanning tree is disconnected into two isolated components, leaving at least one row or column potential impossible to compute from the anchor.",
    explanation: "With fewer than m + n - 1 edges, the bipartite graph is disconnected. The propagation chain halts before reaching all nodes.",
    hint: "A disconnected graph halts the propagation of potentials.",
    level: "expert",
    codeExample: "Degenerate Basis: Graph has >= 2 disjoint components → unsolvable potentials."
  },
  {
    question: "How does placing epsilon (ε) in an independent cell resolve the stalled u-v propagation in a degenerate matrix?",
    shortAnswer: "Epsilon acts as a mathematical bridge edge that connects the disjoint graph components, enabling potential propagation across the entire network.",
    explanation: "Adding the ε edge provides the missing m + n - 1th equation u_i + v_j = c_ij, allowing all remaining potentials to be solved.",
    hint: "Epsilon connects the disjoint sub-graphs.",
    level: "expert",
    codeExample: "Epsilon edge restores spanning tree connectivity: Components = 1."
  },
  {
    question: "If Mamata in Kolkata sets u_2 = 0 instead of u_1 = 0 on the same 3x3 matrix, how do her calculated u and v values relate to Debangshu's values?",
    shortAnswer: "All her row potentials will be shifted by -u_2_old, and all her column potentials will be shifted by +u_2_old.",
    explanation: "Since the potential field is translation-invariant, changing the anchor node simply adds a constant offset across all potentials.",
    hint: "Constant scalar shift across rows and columns.",
    level: "expert",
    codeExample: "u' = u - u_2; v' = v + u_2."
  },
  {
    question: "What is the physical interpretation of the sum (u_i + v_j) for an unoccupied route (i, j)?",
    shortAnswer: "It represents the implied economic value (shadow cost) of moving goods between origin i and destination j through the current basic network.",
    explanation: "If the actual direct shipping rate c_ij is LESS than this implied network shadow cost (c_ij < u_i + v_j), shipping directly is cheaper than using the current basic path.",
    hint: "Implied shadow cost of transportation through the network.",
    level: "expert",
    codeExample: "Shadow Cost = u_i + v_j; Opportunity Cost d_ij = c_ij - (u_i + v_j)."
  },
  {
    question: "Suppose Susmita in Ichapur has an augmented unbalanced matrix with a Dummy Origin (S_Dummy) where unit costs are ₹0. If cell (S_Dummy, D2) is basic, what is its equation?",
    shortAnswer: "u_Dummy + v_2 = 0.",
    explanation: "Because unit cost in the dummy row is c_Dummy,2 = ₹0, the basic cell equation is u_Dummy + v_2 = 0 => u_Dummy = -v_2.",
    hint: "u_Dummy + v_2 = 0.",
    level: "moderate",
    codeExample: "u_Dummy + v_2 = c_Dummy,2 = 0"
  },
  {
    question: "Suppose an analyst calculates u = [0, 4, -2] and v = [6, 12, 9] for a 3x3 matrix. What is the implied shadow cost for cell (3, 2)?",
    shortAnswer: "₹10 ( u_3 + v_2 = -2 + 12 = ₹10 ).",
    explanation: "Shadow cost for cell (3, 2) = u_3 + v_2 = -2 + 12 = 10.",
    hint: "-2 + 12 = 10.",
    level: "moderate",
    codeExample: "u_3 + v_2 = -2 + 12 = 10"
  },
  {
    question: "If actual cost for cell (3, 2) in the question above is c_32 = ₹13, what is its opportunity cost d_32?",
    shortAnswer: "d_32 = +₹3 ( 13 - 10 = +₹3 ).",
    explanation: "d_32 = c_32 - (u_3 + v_2) = 13 - 10 = +₹3.",
    hint: "13 - 10 = 3.",
    level: "moderate",
    codeExample: "d_32 = 13 - 10 = +3"
  },
  {
    question: "If actual cost for cell (1, 3) in the question above is c_13 = ₹6, what is its opportunity cost d_13?",
    shortAnswer: "d_13 = -₹3 ( 6 - (0 + 9) = 6 - 9 = -₹3 ).",
    explanation: "d_13 = c_13 - (u_1 + v_3) = 6 - (0 + 9) = 6 - 9 = -₹3. Since d_13 < 0, cell (1, 3) can reduce total cost!",
    hint: "6 - 9 = -3.",
    level: "moderate",
    codeExample: "d_13 = 6 - 9 = -3"
  },
  {
    question: "Why is setting u_1 = 0 the near-universal standard in university textbooks and examinations across West Bengal?",
    shortAnswer: "To establish a uniform standard for grading and step-by-step evaluation while ensuring students master the potential solving sequence.",
    explanation: "Having a standardized starting convention makes it easy for teachers and students to compare intermediate multiplier values.",
    hint: "Standardized grading convention in examinations.",
    level: "intermediate",
    codeExample: "Standard Convention: Always begin with u_1 = 0 unless instructed otherwise."
  },
  {
    question: "How can a student quickly verify that their calculated u_i and v_j potentials are arithmetic-error-free?",
    shortAnswer: "By checking that for EVERY basic cell (i, j), the sum u_i + v_j exactly equals the matrix entry c_ij.",
    explanation: "Testing u_i + v_j == c_ij for all m + n - 1 basic cells takes 10 seconds and catches any subtraction slips immediately.",
    hint: "Verify u_i + v_j = c_ij on every basic cell.",
    level: "intermediate",
    codeExample: "Audit: all(u[i] + v[j] === c[i][j] for (i, j) in basic_cells)."
  },
  {
    question: "What is the relationship between the dual potentials u_i, v_j and the Dual Objective Function value?",
    shortAnswer: "By Strong Duality of Linear Programming, when the solution is optimal, the dual objective value Sum(S_i * u_i) + Sum(D_j * v_j) exactly EQUALS the primal total cost Z = Sum(c_ij * x_ij).",
    explanation: "Strong Duality guarantees zero duality gap at optimality: Primal Min Z = Dual Max W.",
    hint: "Primal cost equals dual objective value at optimality.",
    level: "expert",
    codeExample: "Strong Duality: sum(S_i * u_i) + sum(D_j * v_j) === sum(c_ij * x_ij)."
  },
  {
    question: "Suppose Mahima in Barrackpore has a 4x4 matrix. How many u_i and v_j potentials must she determine?",
    shortAnswer: "8 potentials (4 u_i values and 4 v_j values).",
    explanation: "m + n = 4 + 4 = 8 potentials.",
    hint: "4 rows + 4 columns = 8 potentials.",
    level: "moderate",
    codeExample: "Potentials Count = m + n = 4 + 4 = 8"
  },
  {
    question: "In a 4x4 matrix, how many basic equations does Mahima use to solve for the 8 potentials?",
    shortAnswer: "7 equations (4 + 4 - 1 = 7 basic cells).",
    explanation: "Non-degenerate 4x4 tableau has 7 basic variables, yielding 7 equations.",
    hint: "4 + 4 - 1 = 7.",
    level: "moderate",
    codeExample: "Equations = m + n - 1 = 7"
  },
  {
    question: "Can an unoccupied non-basic cell have u_i + v_j = c_ij?",
    shortAnswer: "Yes, this occurs when d_ij = c_ij - (u_i + v_j) = 0, indicating an alternative optimal basic route.",
    explanation: "When d_ij = 0, the direct cost matches the implied network shadow cost exactly.",
    hint: "Occurs when d_ij = 0 (alternative optimal route).",
    level: "expert",
    codeExample: "d_ij = 0 <=> c_ij = u_i + v_j for non-basic cell."
  },
  {
    question: "What is the primary visual recommendation for writing u_i and v_j on tableaus to prevent confusion with costs and allocations?",
    shortAnswer: "Write u_i values in a dedicated column on the extreme left or right labeled 'u_i', and write v_j values in a dedicated row at the top or bottom labeled 'v_j', highlighted in distinct colored ink or boxes.",
    explanation: "Clear margin separation prevents confusing dual multipliers with primal cell entries.",
    hint: "Keep potentials in outer margin headers.",
    level: "intermediate",
    codeExample: "Layout: Left Margin = u_i | Top Margin = v_j | Interior = Cells."
  },
  {
    question: "How does mastering the u-v variable solving technique prepare students for advanced supply chain and network flow algorithms?",
    shortAnswer: "It introduces the fundamental concepts of node potentials, tree propagation, shadow pricing, and complementary slackness used in minimum cost flow, shortest path, and maximum flow algorithms.",
    explanation: "Node potentials are the backbone of all modern network optimization theory.",
    hint: "Forms the foundation for node potentials in network optimization.",
    level: "expert",
    codeExample: "Foundation: Node Potentials + Dual Feasibility + Reduced Cost Flow."
  },
  {
    question: "What is the golden rule for computing u-v variables?",
    shortAnswer: "'Anchor one variable to 0; trace basic cells using u_i + v_j = c_ij; audit all basic sums before evaluating empty cells!'",
    explanation: "Following this rule guarantees 100% arithmetic accuracy in every MODI iteration.",
    hint: "Anchor → Trace basic cells → Audit sums → Proceed to empty cells.",
    level: "moderate",
    codeExample: "Golden Rule: (1) Set u_1 = 0 → (2) u_i + v_j = c_ij on Basic → (3) Verify!"
  }
];

export default questions;
