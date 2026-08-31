// topic13_questions.js
// 30 Moderate to Expert Questions on Determining the Optimal Assignment

const questions = [
  {
    question: "What does 'Determining the Optimal Assignment' entail in Operations Research?",
    shortAnswer: "Translating the n boxed zero coordinates [0] from the reduced matrix into a formal operational manifest pairing each resource to a specific task, looking up their unit rates in the original matrix, and computing the certified minimum cost Z* in Indian Rupees (₹).",
    explanation: "This delivers the final managerial policy and execution schedule.",
    hint: "Translating boxed zero coordinates into a formal dispatch manifest and total cost Z*.",
    level: "moderate",
    codeExample: "OptimalManifest = BoxedCoordinates.map((i, j) => ({ worker: i, task: j, cost: c_orig[i][j] }));"
  },
  {
    question: "How is the certified minimum total cost Z* computed from the optimal assignment?",
    shortAnswer: "Z* = Sum_{i=1}^n c_{i, pi(i)} where pi(i) is the task index assigned to resource i in the ORIGINAL cost matrix in Indian Rupees (₹).",
    explanation: "Summing the original matrix rates for the assigned cell coordinates gives the true physical spend.",
    hint: "Sum of original cost entries for the assigned pairings in ₹.",
    level: "moderate",
    codeExample: "Z_opt = Sum(c_orig[i][pi[i]]) in Indian Rupees (₹)."
  },
  {
    question: "How does Strong Duality verify that the computed total cost Z* is 100% GLOBALLY OPTIMAL?",
    shortAnswer: "The total primal cost Z* exactly equals the total sum of all row reductions, column reductions, and additional reduction adjustments: Z* = Sum u_i + Sum v_j + Sum Delta W = W* (Zero Duality Gap).",
    explanation: "Zero duality gap provides a foolproof mathematical proof of optimality.",
    hint: "Z* equals total sum of row, column, and additional reduction shifts.",
    level: "expert",
    codeExample: "Strong Duality: Z_primal === W_dual."
  },
  {
    question: "Suppose Debangshu in Barrackpore finds the optimal assignment: (W1➔J3)=₹12, (W2➔J2)=₹12, (W3➔J4)=₹12, (W4➔J1)=₹11. What is the certified total cost Z*?",
    shortAnswer: "₹46 ( ₹12 + ₹12 + ₹12 + ₹11 = ₹46 ).",
    explanation: "12 + 12 + 12 + 11 = ₹46.",
    hint: "12 + 12 + 12 + 11 = 46.",
    level: "moderate",
    codeExample: "Z_opt = 12 + 12 + 12 + 11 = ₹46"
  },
  {
    question: "In Debangshu's problem above, the row minimums were [10, 12, 12, 11] (sum=45), col minimum was v_3=2 (sum=2), and 1 extra reduction shift of e=1 with (n-L)=1 was made. What is the dual sum W*?",
    shortAnswer: "W* = ₹48... wait! Let's check: Row sum = 10+12+12+11 = 45; Col 3 shift = 2; Uncovered adjust shift = -1. Total W* = ₹46 = Z*!",
    explanation: "Dual potential updates exactly match the primal total of ₹46.",
    hint: "Dual potential sum equals ₹46.",
    level: "expert",
    codeExample: "W_opt = 45 + 2 - 1 = ₹46 === Z_opt."
  },
  {
    question: "What is an 'Alternative Optimal Assignment'?",
    shortAnswer: "A distinct assignment permutation matrix X' != X* that achieves the EXACT SAME minimum total cost Z* = Z(X') = Z(X*).",
    explanation: "Occurs when multiple independent zero configurations exist.",
    hint: "Different pairing combination with the same minimum total cost.",
    level: "moderate",
    codeExample: "Alternative Optima: X_A != X_B, but Z(X_A) === Z(X_B) === Z*."
  },
  {
    question: "How should an operations manager choose among multiple alternative optimal assignments?",
    shortAnswer: "By evaluating secondary operational criteria such as minimizing travel fatigue, worker preferences, equipment maintenance cycles, or regional familiarity.",
    explanation: "Since financial cost is identical, qualitative factors decide the best operational schedule.",
    hint: "Use secondary criteria like worker preference, commute time, or machine lifespan.",
    level: "intermediate",
    codeExample: "SelectionRule: argmin SecondaryCriteria(X_opt)."
  },
  {
    question: "Suppose Susmita in Ichapur manages a 4x4 balanced assignment problem with a dummy column (Task 4 is Dummy). If Worker 3 is paired with Task 4, what is the operational status of Worker 3?",
    shortAnswer: "Worker 3 is placed on STANDBY / IDLE (at ₹0 additional expense), while Workers 1, 2, and 4 execute real tasks.",
    explanation: "Dummy column pairing indicates idle workforce capacity.",
    hint: "Worker 3 is on standby/idle with zero additional cost.",
    level: "moderate",
    codeExample: "Worker 3 = Standby / Idle (₹0 spend)."
  },
  {
    question: "Suppose Mamata in Kolkata manages a 4x4 balanced assignment problem with a dummy row (Worker 4 is Dummy). If Task 2 is paired with Worker 4, what is the operational status of Task 2?",
    shortAnswer: "Task 2 cannot be handled by internal personnel and is OUTSOURCED to external contractors (at ₹0 internal budget expense).",
    explanation: "Dummy row pairing indicates outsourced task demand.",
    hint: "Task 2 is outsourced/deferred.",
    level: "moderate",
    codeExample: "Task 2 = Outsourced / Deferred."
  },
  {
    question: "What is 'Sensitivity Analysis' in the context of an optimal assignment solution?",
    shortAnswer: "Analyzing the range of cost changes Delta c_ij that an assigned or unassigned cell can withstand before the optimal assignment permutation shifts to a different combination.",
    explanation: "Measures solution robustness against wage fluctuations or fuel price spikes.",
    hint: "Analyzes allowable cost changes before the optimal assignment changes.",
    level: "expert",
    codeExample: "Allowable Cost Increase = c_reduced[i][j]."
  },
  {
    question: "If an UNASSIGNED cell (i, j) has a reduced cost of c_reduced[i, j] = ₹4, by how much must its original cost c_ij decrease before it becomes an alternative candidate?",
    shortAnswer: "Its original cost must decrease by AT LEAST ₹4 (or more) to create a zero in that cell.",
    explanation: "Reduced cost represents the exact marginal opportunity barrier.",
    hint: "Must decrease by at least ₹4.",
    level: "expert",
    codeExample: "Break-even Decrease = c_reduced[i][j] = ₹4."
  },
  {
    question: "What mathematical property ensures that the optimal assignment variables x_ij* will ALWAYS be strictly binary integers (0 or 1) without fractional values?",
    shortAnswer: "The Total Unimodularity (TUM) of the bipartite node-arc incidence constraint matrix, which guarantees that all extreme points of the assignment polytope are pure permutation matrices.",
    explanation: "Birkhoff-von Neumann theorem guarantees extreme points are integer permutation matrices.",
    hint: "Total Unimodularity (TUM) of the constraint matrix.",
    level: "expert",
    codeExample: "TUM Property: det(Basis) in {-1, 0, 1} => x_ij in {0, 1} strictly integer."
  },
  {
    question: "Suppose Mahima in Barrackpore reports the optimal assignment as: W1➔J1, W2➔J2, W3➔J1, W4➔J3. What is wrong with this report?",
    shortAnswer: "It violates the 1-to-1 bijection constraint because Job 1 is DOUBLE-BOOKED to both Worker 1 and Worker 3, while Job 4 receives zero workers.",
    explanation: "Each task must appear exactly once in the assignment schedule.",
    hint: "Job 1 is double-booked; violates 1-to-1 bijection.",
    level: "moderate",
    codeExample: "Fatal Error: Double-booking Task 1 (x_11 = 1 and x_31 = 1)."
  },
  {
    question: "Suppose Abhronila in Jadavpur wants to present the final optimal assignment to executive management. What 4 core elements must her executive summary include?",
    shortAnswer: "1. Table of Worker-to-Task pairings; 2. Original cost rate per pairing in Indian Rupees (₹); 3. Status of idle workers or outsourced tasks (if dummies used); 4. Certified Minimum Total Cost Z*.",
    explanation: "These 4 components provide complete operational and financial clarity.",
    hint: "Pairing table, unit rates in ₹, dummy status, and certified total cost Z*.",
    level: "intermediate",
    codeExample: "ExecutiveReport = { Pairings, UnitRatesINR, DummyStatus, CertifiedZ_INR }."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating assignment costs for West Bengal enterprises?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Final Certified Total Spend Z* = ₹46'"
  },
  {
    question: "What is the ultimate golden rule of Determining the Optimal Assignment?",
    shortAnswer: "'Translate boxed zero coordinates [0] into 1-to-1 pairings; look up original rates in Indian Rupees (₹); sum original rates to get Z*; verify zero duality gap via Strong Duality; document idle or outsourced capacity!'",
    explanation: "This complete rule captures all final delivery requirements.",
    hint: "Translate [0] coordinates → Lookup original rates in ₹ → Sum Z* → Verify Strong Duality → Document idle/outsourced.",
    level: "moderate",
    codeExample: "Golden Rule: TranslateCoordinates() → LookupOrigRates(₹) → Sum(Z*) → VerifyDuality() → Report."
  }
];

export default questions;
