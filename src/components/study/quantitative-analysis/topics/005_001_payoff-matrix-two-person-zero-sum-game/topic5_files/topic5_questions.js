// topic5_questions.js
// 30 Moderate to Expert Questions on the Interpretation of Payoff Entries in Game Theory

const questions = [
  {
    question: "What is the standard convention regarding who benefits from a positive matrix entry (+a_ij) in Game Theory?",
    shortAnswer: "A positive entry (+a_ij) represents a net monetary or utility GAIN to Player A (Row Player) and an identical net LOSS / PAYOUT from Player B (Column Player) in Indian Rupees (₹).",
    explanation: "Standard normal form convention always states cell entries from the perspective of Player A.",
    hint: "Gain to Player A (Row Player) and loss to Player B (Column Player).",
    level: "moderate",
    codeExample: "if (a_ij > 0) { playerA_gains(a_ij); playerB_loses(a_ij); }"
  },
  {
    question: "What does a negative entry (-a_ij) signify in a standard zero-sum payoff matrix?",
    shortAnswer: "A negative entry (-a_ij) represents a net LOSS to Player A (Row Player) of ₹|a_ij| and an identical net GAIN to Player B (Column Player) of ₹|a_ij|.",
    explanation: "Row player pays the column player.",
    hint: "Loss to Player A and gain to Player B.",
    level: "moderate",
    codeExample: "if (a_ij < 0) { playerA_pays(Math.abs(a_ij)); playerB_receives(Math.abs(a_ij)); }"
  },
  {
    question: "How is a verbal statement like 'If Company A runs TV ads and Company B does nothing, Company A gains ₹40,000 in market sales from B' translated into a matrix cell?",
    shortAnswer: "As a positive entry: a_12 = +₹40,000 (Row 1 = TV Ads, Col 2 = Do Nothing).",
    explanation: "Direct positive transfer of sales revenue from B to A.",
    hint: "a_12 = +40000.",
    level: "moderate",
    codeExample: "matrix['TV_Ads']['Do_Nothing'] = +40000;"
  },
  {
    question: "How is a verbal statement like 'If Company A discounts prices and Company B launches a loyalty program, Company A loses ₹15,000 to Company B' translated into a matrix cell?",
    shortAnswer: "As a negative entry: a_ij = -₹15,000.",
    explanation: "A net financial outflow from Player A to Player B.",
    hint: "a_ij = -15000.",
    level: "moderate",
    codeExample: "matrix['Discount']['Loyalty'] = -15000;"
  },
  {
    question: "What is the effect of applying a positive linear transformation a'_ij = k * a_ij + c (where k > 0) on the Payoff Matrix?",
    shortAnswer: "The optimal strategy vectors (p* and q*) and saddle point positions remain COMPLETELY UNCHANGED; only the Value of the Game scales: v'* = k * v* + c.",
    explanation: "Preserves the strategic ordering and equilibrium properties of the game.",
    hint: "Strategies and saddle points remain identical; game value scales to k*v* + c.",
    level: "expert",
    codeExample: "LinearTransform: v_new = k * v_old + c; optimal_strategies_unchanged = true;"
  },
  {
    question: "Why do operations researchers apply positive linear transformations to Payoff Matrices?",
    shortAnswer: "To eliminate negative numbers by adding a constant c, or to simplify currency units (e.g. converting ₹ to ₹ Thousands) by multiplying by a scaling factor k.",
    explanation: "Simplifies simplex and algebraic computations without altering strategic outcomes.",
    hint: "To eliminate negative numbers or simplify calculation units.",
    level: "intermediate",
    codeExample: "makeNonNegative: matrix.map(row => row.map(v => v + Math.abs(minVal)));"
  },
  {
    question: "If all entries in a payoff matrix are increased by ₹10,000, what happens to the Value of the Game (v*)?",
    shortAnswer: "The Value of the Game increases by exactly ₹10,000 (v'* = v* + ₹10,000), while the optimal strategies remain identical.",
    explanation: "Constant shift theorem of zero-sum games.",
    hint: "Increases by exactly ₹10,000.",
    level: "moderate",
    codeExample: "v_new = v_old + 10000;"
  },
  {
    question: "If all entries in a payoff matrix are multiplied by 2, what happens to the Value of the Game (v*)?",
    shortAnswer: "The Value of the Game is doubled (v'* = 2 * v*), while the optimal strategies remain identical.",
    explanation: "Scalar multiplication theorem.",
    hint: "Doubles (v'* = 2 * v*).",
    level: "moderate",
    codeExample: "v_new = 2 * v_old;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is interpreting a quality penalty matrix. If a defect costs Player A ₹5,000 in customer warranty refunds to Player B, how is this recorded in Player A's matrix?",
    shortAnswer: "As a negative entry: -₹5,000.",
    explanation: "Player A incurs a loss and pays Player B.",
    hint: "-₹5,000.",
    level: "moderate",
    codeExample: "matrixEntry = -5000;"
  },
  {
    question: "What does an entry a_ij = 0 represent in business and operations research?",
    shortAnswer: "A status quo or breakeven outcome where neither firm gains market share or financial profit from the other.",
    explanation: "No net transfer of revenue.",
    hint: "Status quo / breakeven / zero net transfer.",
    level: "moderate",
    codeExample: "matrixEntry = 0; // Breakeven"
  },
  {
    question: "Can a payoff matrix entry contain fractions or decimals?",
    shortAnswer: "YES! Payoffs can represent continuous metrics such as percentages of market share (e.g. 52.5%), probability weights, or fractions of a Lakh in ₹.",
    explanation: "Payoffs are real numbers in R.",
    hint: "Yes, payoffs can be any real number.",
    level: "moderate",
    codeExample: "matrixEntry = 52.5; // Market share percentage"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating matrix payoffs, game values, and financial transformations in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Cell Payoff a_11 = +₹40,000'"
  },
  {
    question: "What is the ultimate golden rule of Interpreting Payoff Entries in Game Theory?",
    shortAnswer: "'Matrix entries a_ij are ALWAYS from the perspective of Player A; positive is gain to A and negative is gain to B in Indian Rupees (₹); linear transformations a' = k*a + c preserve optimal strategies; always verify that real-world statements translate to correct signs!'",
    explanation: "This complete rule captures all payoff interpretation principles.",
    hint: "Player A perspective → Positive is gain to A, negative is gain to B → Linear transforms preserve strategies in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ParseVerbalStatement() → AssignSignConvention(₹) → ApplyLinearTransform() → VerifyEquilibrium()."
  }
];

export default questions;
