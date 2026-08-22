// topic11_questions.js
// 30 Moderate to Expert Questions on Numerical Exercises for the MODI Method

const questions = [
  {
    question: "In Exercise 1 (3x3 Foundry Problem), what is the initial NWCR basic allocation schedule and total baseline cost?",
    shortAnswer: "Allocations: (1,1)=60, (1,2)=10, (2,2)=70, (2,3)=20, (3,3)=60; Baseline Cost Z_0 = ₹2,740.",
    explanation: "(60*8) + (10*14) + (70*19) + (20*10) + (60*7) = 480 + 140 + 1330 + 200 + 420 = ₹2,740.",
    hint: "NWCR starts at top-left and yields ₹2,740.",
    level: "moderate",
    codeExample: "Z_0 = 480 + 140 + 1330 + 200 + 420 = ₹2,740"
  },
  {
    question: "In Exercise 1, what are the initial dual potentials (u, v) with u_1 = 0?",
    shortAnswer: "u = [0, 5, 2] and v = [8, 14, 5].",
    explanation: "v_1=8, v_2=14; u_2=19-14=5; v_3=10-5=5; u_3=7-5=2.",
    hint: "u = [0, 5, 2], v = [8, 14, 5].",
    level: "moderate",
    codeExample: "u = [0, 5, 2]; v = [8, 14, 5]"
  },
  {
    question: "In Exercise 1, what are the opportunity costs for the 4 empty cells on Iteration 0?",
    shortAnswer: "d_13 = +₹7, d_21 = -₹8 (Entering Variable), d_31 = +₹1, d_32 = -₹3.",
    explanation: "d_13=12-5=7; d_21=5-13=-8; d_31=11-10=1; d_32=13-16=-3.",
    hint: "d_21 = -8 is the most negative value.",
    level: "moderate",
    codeExample: "d_values = { (1,3): 7, (2,1): -8, (3,1): 1, (3,2): -3 }"
  },
  {
    question: "In Exercise 1, what is the closed loop path and theta (θ) for entering cell (2, 1)?",
    shortAnswer: "Loop: (2,1)[+] ➔ (1,1)[-] ➔ (1,2)[+] ➔ (2,2)[-]; θ = min(60, 70) = 60 tons.",
    explanation: "Minus corners are (1, 1)=60 and (2, 2)=70; minimum is 60.",
    hint: "min(60, 70) = 60.",
    level: "moderate",
    codeExample: "theta_1 = min(60, 70) = 60 tons"
  },
  {
    question: "In Exercise 1, what is the total cost Z_1 after Iteration 1?",
    shortAnswer: "Z_1 = ₹2,260 ( ₹2,740 - 60*8 = ₹2,260 ).",
    explanation: "2740 - 480 = ₹2,260.",
    hint: "2740 - 480 = 2260.",
    level: "moderate",
    codeExample: "Z_1 = 2740 - (60 * 8) = ₹2,260"
  },
  {
    question: "In Exercise 1, what is the entering cell and theta (θ) on Iteration 2?",
    shortAnswer: "Entering Cell is (3, 2) with d_32' = -₹3; θ_2 = min(10, 60) = 10 tons.",
    explanation: "Re-evaluating potentials gives d_32' = -3; loop is (3,2) ➔ (2,2) ➔ (2,3) ➔ (3,3); minus corners are 10 and 60.",
    hint: "Entering cell (3, 2) with θ = 10.",
    level: "moderate",
    codeExample: "theta_2 = min(10, 60) = 10 tons"
  },
  {
    question: "In Exercise 1, what is the final certified optimal cost Z*?",
    shortAnswer: "Z* = ₹2,060 (All d'' >= 0).",
    explanation: "Final allocations: (1,2)=70, (2,1)=60, (2,3)=30, (3,2)=10, (3,3)=50. Total = ₹2,060.",
    hint: "Final optimal cost is ₹2,060.",
    level: "moderate",
    codeExample: "Z_opt = ₹2,060"
  },
  {
    question: "In Exercise 2 (3x4 Multi-Destination Problem), how many basic cells must be occupied for a non-degenerate solution?",
    shortAnswer: "6 basic cells ( m + n - 1 = 3 + 4 - 1 = 6 ).",
    explanation: "3 rows + 4 columns - 1 = 6 basic cells.",
    hint: "3 + 4 - 1 = 6.",
    level: "moderate",
    codeExample: "m + n - 1 = 3 + 4 - 1 = 6"
  },
  {
    question: "In Exercise 2, if the Least Cost Method initial cost is Z_0 = ₹3,120 and Iteration 1 pivots θ = 25 tons on d_13 = -₹4, what is the optimal cost Z*?",
    shortAnswer: "Z* = ₹3,020 ( ₹3,120 - 25*4 = ₹3,120 - ₹100 = ₹3,020 ).",
    explanation: "Cost decreases by 25 * 4 = ₹100, reaching ₹3,020.",
    hint: "3120 - 100 = 3020.",
    level: "moderate",
    codeExample: "Z_opt = 3120 - (25 * 4) = ₹3,020"
  },
  {
    question: "In Exercise 3 (Unbalanced Problem with Supply = 240 and Demand = 200), what dummy column is added?",
    shortAnswer: "A Dummy Destination D_Dummy with demand 240 - 200 = 40 tons and unit transportation costs of ₹0 across all rows.",
    explanation: "An artificial column with ₹0 costs balances the 40-ton supply surplus.",
    hint: "Dummy column with demand 40 and unit costs of ₹0.",
    level: "moderate",
    codeExample: "D_Dummy = 40; Cost = [0, 0, 0]."
  },
  {
    question: "In Exercise 3, how is the opportunity cost calculated for an empty cell in the dummy column?",
    shortAnswer: "d_i,dummy = 0 - (u_i + v_dummy) = -(u_i + v_dummy).",
    explanation: "Unit cost is 0, so opportunity cost is simply the negative of the potential sum.",
    hint: "0 - (u_i + v_dummy).",
    level: "moderate",
    codeExample: "d_dummy = 0 - (u_i + v_dummy)"
  },
  {
    question: "In Exercise 4 (Degenerate Problem with 4 Basic Cells in a 3x3 Matrix), how is degeneracy resolved before calculating u-v potentials?",
    shortAnswer: "Place an infinitesimal quantity epsilon (ε) in an independent empty cell that does NOT form a closed loop with existing basic cells (e.g. cell (1, 3)).",
    explanation: "Adding ε restores the basic cell count to m + n - 1 = 5, enabling spanning tree propagation.",
    hint: "Place epsilon ε in an independent loop-free empty cell.",
    level: "expert",
    codeExample: "Place epsilon at cell (1, 3) -> Count = 5 -> Solve u, v."
  },
  {
    question: "In Exercise 4, what is the numerical contribution of epsilon (ε) when computing total transportation cost Z?",
    shortAnswer: "Zero contribution (c_ij * ε ≈ ₹0), because ε is an infinitesimally small positive number that approaches 0.",
    explanation: "Epsilon provides structural connectivity without adding monetary cost.",
    hint: "Cost contribution is zero (c * ε = 0).",
    level: "expert",
    codeExample: "Cost contribution: limit_{epsilon -> 0} (c * epsilon) = 0."
  },
  {
    question: "Suppose Mamata in Kolkata solves a 3x3 matrix and finds all d_ij >= 0 on Iteration 1. What does this indicate?",
    shortAnswer: "The initial basic solution was only 1 pivot away from the global minimum, and the first iteration achieved full optimality.",
    explanation: "Only one improvement pass was needed.",
    hint: "Only 1 iteration needed to reach optimal.",
    level: "moderate",
    codeExample: "Passes = 1 -> Globally Optimal."
  },
  {
    question: "How can a student check if an independent cell was chosen correctly for epsilon (ε)?",
    shortAnswer: "By attempting to trace a closed loop through existing basic cells using the chosen ε cell; if no closed loop can be formed, the position is valid and independent.",
    explanation: "An independent position avoids creating redundant cycles.",
    hint: "Ensure the chosen ε cell cannot form a closed loop with existing basic cells.",
    level: "expert",
    codeExample: "Validation: isAcyclic(BasicCells union {epsilon_cell}) === true."
  },
  {
    question: "In a 3x3 numerical exercise, what is the total number of non-basic opportunity cost evaluations required per iteration?",
    shortAnswer: "4 evaluations ( (3 - 1)(3 - 1) = 2 * 2 = 4 empty cells ).",
    explanation: "(m-1)(n-1) = 4.",
    hint: "(3-1)*(3-1) = 4.",
    level: "moderate",
    codeExample: "EmptyCellsCount = (3 - 1) * (3 - 1) = 4"
  },
  {
    question: "In a 3x4 numerical exercise, how many opportunity cost evaluations are required per iteration?",
    shortAnswer: "6 evaluations ( (3 - 1)(4 - 1) = 2 * 3 = 6 empty cells ).",
    explanation: "(3-1)*(4-1) = 6.",
    hint: "(3-1)*(4-1) = 6.",
    level: "moderate",
    codeExample: "EmptyCellsCount = (3 - 1) * (4 - 1) = 6"
  },
  {
    question: "In a 4x4 numerical exercise, how many basic cells must be occupied, and how many empty cells are evaluated?",
    shortAnswer: "7 basic cells (4 + 4 - 1 = 7) and 9 empty cells ((4 - 1)(4 - 1) = 3 * 3 = 9).",
    explanation: "7 basic cells and 9 empty cells (total 16 cells).",
    hint: "7 basic, 9 empty.",
    level: "moderate",
    codeExample: "Basic = 7; NonBasic = 9; Total = 16."
  },
  {
    question: "Suppose Susmita in Ichapur solves Exercise 1 and gets u = [0, 5, 2] and v = [8, 14, 5]. What is the shadow cost for empty cell (1, 3)?",
    shortAnswer: "₹5 ( u_1 + v_3 = 0 + 5 = 5 ).",
    explanation: "0 + 5 = 5.",
    hint: "0 + 5 = 5.",
    level: "moderate",
    codeExample: "u_1 + v_3 = 0 + 5 = 5"
  },
  {
    question: "Continuing from above, if actual cost is c_13 = ₹12, what is d_13?",
    shortAnswer: "d_13 = +₹7 ( 12 - 5 = +7 ).",
    explanation: "12 - 5 = +₹7.",
    hint: "12 - 5 = 7.",
    level: "moderate",
    codeExample: "d_13 = 12 - 5 = +7"
  },
  {
    question: "Suppose in Exercise 2, an empty cell has c_24 = ₹9, u_2 = 4, and v_4 = 7. What is d_24?",
    shortAnswer: "d_24 = -₹2 ( 9 - (4 + 7) = 9 - 11 = -₹2 ).",
    explanation: "9 - 11 = -₹2. This is a negative evaluation (entering candidate).",
    hint: "9 - 11 = -2.",
    level: "moderate",
    codeExample: "d_24 = 9 - (4 + 7) = -2"
  },
  {
    question: "If the loop for cell (2, 4) above has minus corners with allocations 15 and 35, what is θ?",
    shortAnswer: "θ = 15 tons ( min(15, 35) = 15 ).",
    explanation: "The minimum among minus corners is 15.",
    hint: "min(15, 35) = 15.",
    level: "moderate",
    codeExample: "theta = min(15, 35) = 15"
  },
  {
    question: "What is the cost reduction achieved by this pivot in Exercise 2?",
    shortAnswer: "₹30 reduction ( 15 tons * ₹2 = ₹30 ).",
    explanation: "Delta Z = 15 * (-2) = -₹30.",
    hint: "15 * 2 = 30.",
    level: "moderate",
    codeExample: "Delta Z = 15 * (-2) = -₹30"
  },
  {
    question: "Why should students always show the row and column sum audits on their exam papers after every iteration?",
    shortAnswer: "To prove that primal feasibility is maintained, guaranteeing that no arithmetic errors occurred during the plus-minus transfer.",
    explanation: "Row and column audits demonstrate rigorous mathematical verification.",
    hint: "Shows examiner that supplies and demands remain perfectly conserved.",
    level: "intermediate",
    codeExample: "Exam Tip: Always write 'Row Sums == S_i' and 'Col Sums == D_j'."
  },
  {
    question: "In Exercise 3, if dummy cell (2, Dummy) has u_2 = 5 and v_Dummy = 2, what is its opportunity cost?",
    shortAnswer: "d_2,Dummy = -₹7 ( 0 - (5 + 2) = 0 - 7 = -₹7 ).",
    explanation: "0 - 7 = -₹7.",
    hint: "0 - (5 + 2) = -7.",
    level: "moderate",
    codeExample: "d_2_dummy = 0 - (5 + 2) = -7"
  },
  {
    question: "In Exercise 4, if epsilon (ε) has a minus sign (-θ) during a pivot and θ = ε, what happens to the epsilon cell?",
    shortAnswer: "The allocation becomes ε - ε = 0, and the epsilon cell cleanly leaves the basis, leaving a fully non-degenerate basis with positive numbers!",
    explanation: "A pivot on ε transitions the basis away from degeneracy.",
    hint: "ε - ε = 0 -> leaves basis cleanly.",
    level: "expert",
    codeExample: "x_eps_new = eps - eps = 0 (Exits Basis)."
  },
  {
    question: "What is the most effective time management tip for solving 3x3 MODI exercises under university exam conditions?",
    shortAnswer: "Anchor u_1 = 0 immediately; write potentials directly on the margin lines; calculate (u_i + v_j) mentally for empty cells; trace 4-corner loops with neat pencil lines.",
    explanation: "Streamlined layout prevents wasting precious exam time.",
    hint: "Clean margins, mental addition, neat loop lines.",
    level: "intermediate",
    codeExample: "Exam Strategy: Fast u-v -> Mental d_ij -> Clean 4-corner loop."
  },
  {
    question: "Suppose Debangshu verifies all 4 exercises using computer software. What library in Python can solve these transportation problems directly?",
    shortAnswer: "`scipy.optimize.linprog` (using the HiGHS solver) or specialized network packages like `networkx`.",
    explanation: "Standard LP solvers verify manual calculations in milliseconds.",
    hint: "scipy.optimize.linprog in Python.",
    level: "intermediate",
    codeExample: "from scipy.optimize import linprog; res = linprog(c, A_eq=A, b_eq=b)"
  },
  {
    question: "What is the golden rule for mastering numerical exercises in the MODI method?",
    shortAnswer: "'Anchor u_1=0; audit basic equations; pick min(d < 0); pivot θ cleanly; re-audit sums; repeat until all d >= 0; state minimum cost Z* in ₹!'",
    explanation: "Following this universal routine guarantees full marks on any transportation examination.",
    hint: "Anchor -> Audit -> Pivot -> Re-audit -> Repeat -> State Z* in ₹.",
    level: "moderate",
    codeExample: "Golden Routine: Anchor -> Solve u-v -> d_ij -> Loop -> Update -> Verify."
  }
];

export default questions;
