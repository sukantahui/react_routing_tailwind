// topic2_questions.js
// 30 Moderate to Expert Questions on the Minimax Principle in Game Theory

const questions = [
  {
    question: "What is the formal mathematical definition of the 'Minimax Principle' in Game Theory?",
    shortAnswer: "A decision rule adopted by Player B (Column Player / Minimizer) that minimizes the maximum possible payout conceded across all strategies: Minimax (beta) = min_j [ max_i a_ij ].",
    explanation: "Player B selects the column strategy that caps the worst-case liability ceiling in ₹.",
    hint: "Minimax = min_j [ max_i a_ij ] = Upper value of the game.",
    level: "moderate",
    codeExample: "Minimax = Math.min(...[0,1,2].map(c => Math.max(...matrix.map(r => r[c]))));"
  },
  {
    question: "Why is the Minimax Principle described as a 'Loss-Capping' or 'Liability-Minimizing' criterion?",
    shortAnswer: "Because Player B assumes that for whichever column j is chosen, the intelligent opponent (Player A) will act with perfect rationality to choose the row that maximizes Player A's payoff (max_i a_ij).",
    explanation: "Caps the maximum payout conceded against the worst-case opponent attack.",
    hint: "Assumes the opponent will choose the highest payoff row against your column.",
    level: "moderate",
    codeExample: "LiabilityCeiling: max_i a_ij for chosen column j."
  },
  {
    question: "What is the 'Upper Value of the Game' (v_upper)?",
    shortAnswer: "The Minimax value beta = min_j max_i a_ij, representing the absolute maximum payout Player B can guarantee to concede regardless of what strategy Player A chooses.",
    explanation: "Player B is mathematically guaranteed to concede no more than v_upper in ₹.",
    hint: "v_upper = Minimax value = guaranteed ceiling on Player B's payout.",
    level: "moderate",
    codeExample: "v_upper = beta = min_j(max_i a_ij);"
  },
  {
    question: "What are the 2 computational stages to determine the Minimax strategy for Player B?",
    shortAnswer: "Stage 1: Find the Column Maximum (max_i a_ij) down each vertical column; Stage 2: Select the MINIMUM among these column maxima (min_j ColMax_j).",
    explanation: "Vertical maximization followed by horizontal minimization.",
    hint: "Stage 1: Find max in each column; Stage 2: Pick the min of those maxes.",
    level: "moderate",
    codeExample: "Stage1: colMaxs = cols.map(c => Math.max(...matrix.map(r => r[c]))); Stage2: minimax = Math.min(...colMaxs);"
  },
  {
    question: "Suppose a 3x3 matrix has Column Maxima: C1 = ₹40k, C2 = ₹25k, C3 = ₹35k. What is the Minimax value and which strategy should Player B choose?",
    shortAnswer: "Minimax = min(40, 25, 35) = ₹25,000; Player B should choose Strategy B2.",
    explanation: "Strategy B2 caps Player B's maximum payout at ₹25,000.",
    hint: "Minimax = ₹25k; Strategy B2.",
    level: "moderate",
    codeExample: "Minimax = Math.min(40000, 25000, 35000) = 25000; optimalCol = 'B2';"
  },
  {
    question: "Can Player B concede LESS payout than the Minimax value (v_upper) in actual game play?",
    shortAnswer: "YES! If Player A makes a sub-optimal or erroneous move, Player B's actual payout will be strictly less than v_upper (or Player B may even win money).",
    explanation: "v_upper is the worst-case ceiling; opponent errors reduce Player B's liability.",
    hint: "Yes, v_upper is the ceiling; mistakes by Player A reduce Player B's payout.",
    level: "intermediate",
    codeExample: "ActualPayout <= v_upper; // Always holds under optimal Player B play"
  },
  {
    question: "Can Player B be forced to concede MORE than the Minimax value if Player B plays their optimal Minimax strategy?",
    shortAnswer: "NO! By mathematical definition, playing the Minimax column guarantees that Player B concedes at most v_upper, no matter what Player A does.",
    explanation: "The Minimax strategy is an ironclad upper liability ceiling.",
    hint: "No, Player B is mathematically guaranteed to concede at most v_upper.",
    level: "expert",
    codeExample: "assert(actualPayout <= minimaxValue);"
  },
  {
    question: "Suppose Susmita in Ichapur is evaluating 3 supplier shipping routes. Column 1 max liability is ₹50,000, Column 2 max liability is ₹30,000, and Column 3 max liability is ₹45,000. What is Susmita's Minimax strategy?",
    shortAnswer: "Column 2 (Strategy B2), which caps her maximum transport liability at ₹30,000.",
    explanation: "Minimizes the maximum cost liability across all possible demand surges.",
    hint: "Strategy B2 (₹30,000).",
    level: "moderate",
    codeExample: "SusmitaChoice = 'Strategy B2';"
  },
  {
    question: "How does the Minimax Principle relate to the Maximin Principle of Player A?",
    shortAnswer: "Maximin (alpha) <= Minimax (beta) universally; if alpha = beta, the Minimax column and Maximin row intersect at a pure Saddle Point.",
    explanation: "Links the security floor of Player A to the liability ceiling of Player B.",
    hint: "Maximin <= Minimax; equality indicates a saddle point equilibrium.",
    level: "expert",
    codeExample: "Invariant: alpha <= beta; SaddlePoint = (alpha === beta);"
  },
  {
    question: "What is the Minimax strategy if all elements in column j are negative?",
    shortAnswer: "Player B chooses the column with the minimum (most negative) column maximum, which maximizes Player B's net monetary gain in Indian Rupees (₹).",
    explanation: "Minimax works seamlessly across positive and negative payoffs.",
    hint: "Pick the column with the most negative column maximum.",
    level: "moderate",
    codeExample: "minimax = Math.min(-10000, -35000, -20000) = -35000;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating Minimax values, liability ceilings, and strategic payouts in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimax Liability Ceiling = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Minimax Principle in Game Theory?",
    shortAnswer: "'The Minimax Principle is Player B’s loss-capping criterion: find the column maxima (max_i a_ij) vertically, then take their minimum (min_j) horizontally; this guarantees that Player B concedes at most v_upper in Indian Rupees (₹) regardless of opponent actions!'",
    explanation: "This complete rule captures all Minimax mechanics.",
    hint: "Column maxima vertically → Minimize horizontally → Guaranteed ceiling v_upper in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ColumnMaxima() → MinimizeLiabilityCeiling() → GuaranteeVUpper(₹)."
  }
];

export default questions;
