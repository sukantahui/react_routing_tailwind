// topic7_questions.js
// 30 Comprehensive Master Review & Viva Voce Questions for Module 005_002 Pure Strategy & Saddle Point

const questions = [
  {
    question: "What is a 'Pure Strategy' in Game Theory and how is it mathematically represented?",
    shortAnswer: "A deterministic decision rule selecting a single action with 100% certainty (probability p = 1.0), represented as a standard unit basis vector p = (0, ..., 1, ..., 0)^T.",
    explanation: "Pure strategies correspond to the extreme vertices of the strategy simplex.",
    hint: "Deterministic selection of a single strategy with probability 1.0 (unit basis vector).",
    level: "moderate",
    codeExample: "p_star = [0, 1, 0]; // 100% on Strategy 2"
  },
  {
    question: "What is the Maximin Principle and which player adopts it?",
    shortAnswer: "Adopted by Player A (Row Player / Maximizer): calculates row minima min_j a_ij horizontally, then selects the maximum: Maximin (alpha) = max_i [ min_j a_ij ] = v_lower in Indian Rupees (₹).",
    explanation: "Guarantees Player A's worst-case security floor.",
    hint: "Player A's security-first criterion: max_i min_j a_ij.",
    level: "moderate",
    codeExample: "alpha = Math.max(...matrix.map(r => Math.min(...r)));"
  },
  {
    question: "What is the Minimax Principle and which player adopts it?",
    shortAnswer: "Adopted by Player B (Column Player / Minimizer): calculates column maxima max_i a_ij vertically, then selects the minimum: Minimax (beta) = min_j [ max_i a_ij ] = v_upper in Indian Rupees (₹).",
    explanation: "Caps Player B's worst-case payout liability.",
    hint: "Player B's loss-capping criterion: min_j max_i a_ij.",
    level: "moderate",
    codeExample: "beta = Math.min(...cols.map(c => Math.max(...matrix.map(r => r[c]))));"
  },
  {
    question: "What is the universal invariant inequality between Maximin and Minimax for any payoff matrix?",
    shortAnswer: "Maximin <= Minimax (max_i min_j a_ij <= min_j max_i a_ij), or v_lower <= v_upper.",
    explanation: "The guaranteed floor for Player A can never exceed the guaranteed ceiling for Player B.",
    hint: "Maximin <= Minimax (v_lower <= v_upper).",
    level: "moderate",
    codeExample: "Invariant: maximin <= minimax;"
  },
  {
    question: "What conditions define a 'Saddle Point' in a Payoff Matrix?",
    shortAnswer: "A cell (i*, j*) whose entry a_i*j* is simultaneously the minimum in its row and the maximum in its column, satisfying: Maximin = Minimax = a_i*j* = v*.",
    explanation: "Represents a stable Nash equilibrium in pure strategies.",
    hint: "Maximin = Minimax; entry is simultaneously Row Min and Col Max.",
    level: "moderate",
    codeExample: "isSaddle = (r, c) => matrix[r][c] === rowMin[r] && matrix[r][c] === colMax[c];"
  },
  {
    question: "What is the Nash Equilibrium stability condition at a Saddle Point (i*, j*)?",
    shortAnswer: "a_i,j* <= a_i*,j* <= a_i*,j for all rows i and all columns j; neither player can gain by deviating unilaterally.",
    explanation: "Unilateral deviation strictly reduces Player A's payoff or increases Player B's payout.",
    hint: "a_i,j* <= v* <= a_i*,j for all alternative i and j.",
    level: "expert",
    codeExample: "NashStability: matrix[i][j_star] <= v_star && v_star <= matrix[i_star][j];"
  },
  {
    question: "What is the 'Value of the Game' (v*) and how is it bounded?",
    shortAnswer: "The expected return under mutual optimal play in Indian Rupees (₹), strictly bounded by: v_lower <= v* <= v_upper.",
    explanation: "In strictly determined games, v* = a_i*j* = Maximin = Minimax.",
    hint: "v_lower <= v* <= v_upper in ₹.",
    level: "moderate",
    codeExample: "Bounds: v_lower <= v_star && v_star <= v_upper;"
  },
  {
    question: "When is a zero-sum game classified as a 'Fair Game'?",
    shortAnswer: "When the Value of the Game is exactly zero (v* = ₹0).",
    explanation: "Neither player has an inherent mathematical advantage.",
    hint: "A game where v* = ₹0.",
    level: "moderate",
    codeExample: "isFair = (v_star === 0);"
  },
  {
    question: "What are the 5 steps to extract Optimal Pure Strategies in any matrix game?",
    shortAnswer: "1. Compute Row Minima; 2. Identify Maximin row i*; 3. Compute Column Maxima; 4. Identify Minimax column j*; 5. Verify a_i*j* = Maximin = Minimax = v*; then (A_i*, B_j*) is optimal.",
    explanation: "The standard 5-step optimal pure strategy extraction algorithm.",
    hint: "Row mins -> Maximin i* -> Col maxes -> Minimax j* -> Verify equality.",
    level: "moderate",
    codeExample: "OptimalProfile = ['A_' + iStar, 'B_' + jStar];"
  },
  {
    question: "What happens if a matrix game has Multiple Saddle Points?",
    shortAnswer: "All saddle points MUST have the exact same payoff value v*, and any combination of optimal row and column strategies from these saddle points forms an interchangeable equilibrium.",
    explanation: "Multiple saddle points form an interchangeable rectangular equilibrium grid.",
    hint: "Identical game value v* and interchangeable strategies.",
    level: "expert",
    codeExample: "allSaddles.every(s => s.value === v_star); // true"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating pure strategy payoffs, security floors, liability ceilings, and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Game = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Pure Strategy & Saddle Point Module?",
    shortAnswer: "'Calculate Row Minima for Player A (Maximin) and Column Maxima for Player B (Minimax); if Maximin = Minimax, the intersection is a stable Saddle Point with optimal pure strategies (A_i*, B_j*) and Game Value v* in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all foundational principles of Module 005_002.",
    hint: "Maximin = Minimax -> Saddle point at (A_i*, B_j*) with Game Value v* in ₹.",
    level: "moderate",
    codeExample: "MasterGoldenRule: ExtractRowMinColMax() -> TestSaddlePoint() -> StateEquilibrium(v*, ₹)."
  }
];

export default questions;
