// topic7_questions.js
// 30 Moderate to Expert Questions on the Plus-Minus Allocation Pattern in the MODI Method

const questions = [
  {
    question: "Why must the entering cell ALWAYS receive the PLUS (+θ) sign in the plus-minus allocation pattern?",
    shortAnswer: "Because the entering cell is currently empty (x_enter = 0); receiving +θ activates the route with a positive allocation of θ units.",
    explanation: "The purpose of pivoting is to bring the entering variable into the basis with a positive value: x_enter = 0 + θ = θ > 0.",
    hint: "The entering cell starts at 0 and needs +θ to become positive.",
    level: "moderate",
    codeExample: "x_enter_new = 0 + theta = +theta"
  },
  {
    question: "How are the plus (+) and minus (-) signs assigned around the vertices of a closed loop?",
    shortAnswer: "In strict alternating order (+, -, +, -, +, -...) starting with + at the entering cell and moving consecutively around the loop perimeter.",
    explanation: "Alternating signs ensures that every row and column involved contains exactly one +θ and one -θ vertex.",
    hint: "Strict alternation: +, -, +, -, +...",
    level: "moderate",
    codeExample: "LoopSigns = ['+', '-', '+', '-', '+', '-']"
  },
  {
    question: "How does the plus-minus allocation pattern guarantee that total row supply S_i remains perfectly conserved?",
    shortAnswer: "Because in every row involved in the loop, exactly one cell receives +θ and exactly one cell receives -θ, producing a net change of +θ - θ = 0.",
    explanation: "New Row Sum = Old Row Sum + θ - θ = S_i + 0 = S_i.",
    hint: "+θ - θ = 0 net change across the row.",
    level: "moderate",
    codeExample: "Delta(Row Supply) = +theta - theta = 0"
  },
  {
    question: "How does the pattern guarantee that total destination demand D_j remains conserved?",
    shortAnswer: "Because in every column involved in the loop, exactly one cell receives +θ and exactly one cell receives -θ, producing a net change of +θ - θ = 0.",
    explanation: "New Column Sum = Old Column Sum + θ - θ = D_j + 0 = D_j.",
    hint: "+θ - θ = 0 net change across the column.",
    level: "moderate",
    codeExample: "Delta(Col Demand) = +theta - theta = 0"
  },
  {
    question: "What is the exact mathematical formula for determining the maximum allowable transfer quantity theta (θ)?",
    shortAnswer: "θ = min { x_ij | (i, j) is a MINUS (-) corner vertex of the loop }.",
    explanation: "This formula ensures that no minus corner's allocation drops below zero (maintaining non-negativity x_ij >= 0 for all cells).",
    hint: "Minimum of allocations among the minus (-) corners.",
    level: "moderate",
    codeExample: "theta = min(x_minus_corners)"
  },
  {
    question: "What would happen if theta (θ) were chosen larger than min(x_minus)?",
    shortAnswer: "At least one minus corner would end up with a NEGATIVE allocation (x_ij - θ < 0), which physically violates the non-negativity constraint x_ij >= 0.",
    explanation: "In the physical world, trucks cannot carry negative tons of cargo.",
    hint: "Causes negative freight allocations.",
    level: "moderate",
    codeExample: "If theta > min(x_minus) => x_k - theta < 0 (Infeasible!)."
  },
  {
    question: "Why can theta (θ) NOT be chosen from the plus (+) corners of the loop?",
    shortAnswer: "Because plus corners INCREASE their allocation (x_ij + θ); they place no lower-bound restriction on non-negativity.",
    explanation: "Adding θ to an already non-negative allocation always yields a larger non-negative number.",
    hint: "Plus corners increase in volume; only minus corners risk dropping below zero.",
    level: "moderate",
    codeExample: "x_plus_new = x_plus + theta >= 0 (Always non-negative)."
  },
  {
    question: "Suppose Debangshu in Barrackpore has minus corners at cell (1, 1) with x_11 = 60 and cell (2, 2) with x_22 = 70. What is θ?",
    shortAnswer: "θ = 60 tons ( min(60, 70) = 60 ).",
    explanation: "θ is the minimum of 60 and 70, which is 60.",
    hint: "min(60, 70) = 60.",
    level: "moderate",
    codeExample: "theta = min(60, 70) = 60"
  },
  {
    question: "In Debangshu's problem, which cell is the 'Leaving Variable' (the cell that drops out of the basis)?",
    shortAnswer: "Cell (1, 1), because its allocation drops to 60 - 60 = 0 tons.",
    explanation: "The minus corner that attains the minimum θ reaches 0 and leaves the basis to become an empty non-basic cell.",
    hint: "Cell (1, 1) reaches 0 and exits the basis.",
    level: "moderate",
    codeExample: "Leaving Cell = (1, 1) since x_11_new = 0."
  },
  {
    question: "Suppose Susmita in Ichapur has a 6-corner loop where minus corners have allocations: 45, 18, and 30 tons. What is θ?",
    shortAnswer: "θ = 18 tons ( min(45, 18, 30) = 18 ).",
    explanation: "The minimum among 45, 18, and 30 is 18.",
    hint: "min(45, 18, 30) = 18.",
    level: "moderate",
    codeExample: "theta = min(45, 18, 30) = 18"
  },
  {
    question: "In Susmita's problem, what are the updated allocations for the three minus corners after subtracting θ = 18?",
    shortAnswer: "Corner 1: 45 - 18 = 27 tons; Corner 2: 18 - 18 = 0 tons (leaves basis); Corner 3: 30 - 18 = 12 tons.",
    explanation: "Subtract θ = 18 from each minus corner.",
    hint: "45-18=27, 18-18=0, 30-18=12.",
    level: "moderate",
    codeExample: "[45 - 18, 18 - 18, 30 - 18] = [27, 0, 12]"
  },
  {
    question: "What happens if two minus corners are TIED with the same minimum allocation (e.g. both have x = 40 tons, so θ = 40)?",
    shortAnswer: "Both cells drop to zero allocation, but EXACTLY ONE cell is dropped from the basis; the other tied cell REMAINS in the basis with an allocation of 0 (degenerate basic cell).",
    explanation: "Dropping both cells would reduce the count of basic variables to m + n - 2, causing degeneracy and disconnecting the spanning tree.",
    hint: "Drop only 1 cell to empty; keep the other as basic with allocation 0.",
    level: "expert",
    codeExample: "Tie Protocol: Drop 1 cell to NonBasic; retain 1 cell in Basis with x = 0."
  },
  {
    question: "Why is maintaining exactly m + n - 1 basic variables so critical during the plus-minus reallocation step?",
    shortAnswer: "Because having fewer than m + n - 1 basic cells disconnects the bipartite spanning tree and prevents the calculation of u_i and v_j potentials in subsequent iterations.",
    explanation: "A connected tree requires exactly m + n - 1 edges.",
    hint: "Preserves spanning tree connectivity for u-v calculations.",
    level: "expert",
    codeExample: "Basis Invariant: Count(BasicCells) === m + n - 1."
  },
  {
    question: "Suppose Mamata in Kolkata has plus corners at cell (1, 2) with x_12 = 10 and entering cell (2, 1) with x_21 = 0. If θ = 60, what are the new plus corner allocations?",
    shortAnswer: "Entering Cell (2, 1): 0 + 60 = 60 tons; Cell (1, 2): 10 + 60 = 70 tons.",
    explanation: "Add θ = 60 to each plus corner vertex.",
    hint: "0 + 60 = 60; 10 + 60 = 70.",
    level: "moderate",
    codeExample: "[0 + 60, 10 + 60] = [60, 70]"
  },
  {
    question: "What happens to basic cells that are NOT part of the closed loop during the plus-minus pivot?",
    shortAnswer: "Their allocations remain COMPLETELY UNCHANGED.",
    explanation: "Flow is reallocated exclusively along the edges of the fundamental closed loop.",
    hint: "Non-loop basic cells remain unchanged.",
    level: "moderate",
    codeExample: "forall cell not in Loop: x_new[cell] = x_old[cell]."
  },
  {
    question: "How does the net change in total transportation cost relate to θ and the unit opportunity cost d_enter?",
    shortAnswer: "Delta Z = theta * d_enter (Total cost decreases by θ * |d_enter| Rupees).",
    explanation: "Since d_enter is the net evaluation index per unit, transferring θ units reduces total cost by θ * d_enter.",
    hint: "Delta Z = theta * d_enter.",
    level: "moderate",
    codeExample: "Delta Z = theta * d_enter"
  },
  {
    question: "Suppose Mahima in Barrackpore pivots with θ = 50 tons on an entering cell with d_enter = -₹7. What is the exact rupee savings?",
    shortAnswer: "₹350 savings ( 50 tons * ₹7 = ₹350 reduction in total freight cost ).",
    explanation: "Delta Z = 50 * (-7) = -₹350.",
    hint: "50 * 7 = 350.",
    level: "moderate",
    codeExample: "Savings = 50 * 7 = ₹350"
  },
  {
    question: "Can theta (θ) ever be zero in a valid MODI pivot?",
    shortAnswer: "Yes, in a degenerate pivot where a basic cell in a minus corner already has an allocation of 0 (x_minus = 0), θ = min(0, ...) = 0.",
    explanation: "A degenerate pivot swaps basis variables without physically changing any shipment tonnages or total cost Z.",
    hint: "θ = 0 in a degenerate pivot.",
    level: "expert",
    codeExample: "Degenerate Pivot: theta = 0 => Basis updates, Z unchanged."
  },
  {
    question: "What is the physical interpretation of a degenerate pivot where θ = 0?",
    shortAnswer: "It changes the basis representation (swapping dual shadow prices) to unlock a new path around a degenerate vertex on the simplex polytope.",
    explanation: "It reconfigures the spanning tree to allow future non-zero descent steps.",
    hint: "Swaps basis representation to unlock new descent directions.",
    level: "expert",
    codeExample: "Polytope step: pivoting at a degenerate vertex."
  },
  {
    question: "Suppose Abhronila in Jadavpur has 4 corners: (1,1)[-θ], (1,2)[+θ], (2,2)[-θ], (2,1)[+θ]. If she accidentally assigns (+θ) to (1,1) and (-θ) to (1,2), what happens to the entering cell (2,1)?",
    shortAnswer: "The entering cell would receive (-θ), which would mean 0 - θ = -θ < 0 (an invalid negative allocation).",
    explanation: "The entering cell must always be positive; starting with the wrong sign corrupts the entire loop.",
    hint: "Entering cell must always be +θ.",
    level: "moderate",
    codeExample: "Sign error: x_enter = 0 - theta < 0 (Fatal Error)."
  },
  {
    question: "How can a student quickly verify their new tableau after applying the plus-minus pattern?",
    shortAnswer: "1. Check row sums == Supply S_i; 2. Check column sums == Demand D_j; 3. Count basic cells == m + n - 1.",
    explanation: "This 3-point audit takes 15 seconds and verifies 100% mathematical validity.",
    hint: "Verify row sums, column sums, and basic cell count (m+n-1).",
    level: "intermediate",
    codeExample: "Audit: (RowSums == S) && (ColSums == D) && (Count == m+n-1)."
  },
  {
    question: "Suppose an analyst creates a new tableau after pivoting and finds only 4 basic cells in a 3x3 matrix. What mistake did they make?",
    shortAnswer: "They dropped TWO tied minus corners from the basis instead of dropping only one.",
    explanation: "Dropping both tied cells causes basis degeneracy. One must be retained with allocation 0.",
    hint: "Dropped two tied minus corners instead of one.",
    level: "expert",
    codeExample: "Mistake: Basis count dropped to m+n-2 = 4 (Degenerate)."
  },
  {
    question: "Can an empty non-basic cell that was NOT part of the loop receive any allocation during the pivot?",
    shortAnswer: "No, only cells that are corner vertices of the active closed loop have their allocations modified.",
    explanation: "All non-loop cells remain untouched.",
    hint: "Non-loop cells remain untouched.",
    level: "moderate",
    codeExample: "Modification set is strictly the vertices of the closed loop."
  },
  {
    question: "What is the algebraic proof that the sum of costs around the loop (+c_enter - c_1 + c_2 - c_3) equals d_enter?",
    shortAnswer: "Substitute c_ij = u_i + v_j for all basic corners: (+c_enter - (u_1+v_1) + (u_1+v_2) - (u_2+v_2)) = c_enter - u_2 - v_1 = c_enter - (u_2 + v_1) = d_enter.",
    explanation: "All intermediate row and column potentials cancel out telescopically, leaving exactly c_enter - u_enter - v_enter = d_enter.",
    hint: "Potentials cancel telescopically: +u_1 - u_1 = 0 and +v_2 - v_2 = 0.",
    level: "expert",
    codeExample: "Telescoping sum: c_enter - (u_1+v_1) + (u_1+v_2) - (u_2+v_2) = c_enter - (u_2+v_1) = d_enter."
  },
  {
    question: "In the above proof, why is the telescoping cancellation considered one of the most beautiful properties of linear programming duality?",
    shortAnswer: "Because it proves that local edge potentials algebraically compute global cycle integrals without numerical approximations.",
    explanation: "Duality transforms continuous path integrals into discrete vertex potentials.",
    hint: "Local potentials equal global cycle integrals.",
    level: "expert",
    codeExample: "Cycle Integral: sum_{loop} (+/-) c = d_enter."
  },
  {
    question: "Suppose Mamata in Kolkata wants to know if the leaving cell can ever re-enter the basis in a later MODI iteration.",
    shortAnswer: "Yes, in complex multi-iteration problems, a cell that leaves the basis in iteration 1 can re-enter in iteration 3 if changing network conditions make it lucrative again.",
    explanation: "The simplex algorithm visits successive vertices on the polyhedron; variables can enter, leave, and re-enter.",
    hint: "Variables can leave and re-enter in later iterations.",
    level: "expert",
    codeExample: "Basis dynamics: x_ij can transition Basic -> NonBasic -> Basic."
  },
  {
    question: "What is the visual convention for drawing the plus and minus signs on the tableau during exams?",
    shortAnswer: "Write (+θ) and (-θ) in the upper-left or center of the respective corner cells in distinct colored ink or pencil, keeping unit costs in the top-right.",
    explanation: "Clear labeling prevents mixing up transfer signs with unit shipping costs.",
    hint: "Write +θ and -θ clearly in corner cells.",
    level: "intermediate",
    codeExample: "Cell layout: Top-right = c_ij | Center = x_ij (+/- θ)."
  },
  {
    question: "How does the plus-minus pattern connect to Kirchoff's Current Law (KCL) in electrical circuit analysis?",
    shortAnswer: "Just as KCL states that current entering a node must equal current leaving it (Sum I = 0), the plus-minus pattern ensures that freight entering a row/column equals freight leaving it (+θ - θ = 0).",
    explanation: "Transportation networks are conservative flow networks governed by identical continuity laws.",
    hint: "Conservation of flow: incoming flow equals outgoing flow (+θ - θ = 0).",
    level: "expert",
    codeExample: "Analogy: Kirchoff's Law Sum(Flow) = 0 <=> +θ - θ = 0."
  },
  {
    question: "What is the ultimate golden rule for applying the plus-minus allocation pattern?",
    shortAnswer: "'Entering cell gets +θ; alternate signs (+, -, +, -) around loop corners; set θ = min(minus corners); add θ to plus cells, subtract θ from minus cells; verify row/column sums!'",
    explanation: "This complete rule guarantees error-free flow pivoting in every MODI problem.",
    hint: "+θ at enter -> alternate signs -> θ = min(minus) -> update and verify sums.",
    level: "moderate",
    codeExample: "Golden Rule: (1) Enter=+θ -> (2) Alternate -> (3) θ=min(minus) -> (4) Pivot -> (5) Audit."
  }
];

export default questions;
