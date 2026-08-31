// topic1_questions.js
// 30 Moderate to Expert Questions on mx2 Games in Game Theory

const questions = [
  {
    question: "What is the structural definition of an mx2 game?",
    shortAnswer: "An mx2 game is a Two-Person Zero-Sum Game where Player A (the row maximizer) has m strategies (where m >= 3), and Player B (the column minimizer) has exactly 2 strategies.",
    explanation: "Standard matrix dimension definition for mx2 games.",
    hint: "Player A has m >= 3 strategies; Player B has 2 strategies.",
    level: "moderate",
    codeExample: "is_mx2 = (matrix.length >= 3 && matrix[0].length === 2);"
  },
  {
    question: "How is Player B's mixed strategy parameterized in an mx2 game?",
    shortAnswer: "As a 1D probability variable q1 in [0, 1], where q = [q1, 1 - q1]^T (probability of playing Column 1 is q1, and Column 2 is 1 - q1).",
    explanation: "Probability simplex parameterization for Player B.",
    hint: "q = [q1, 1 - q1]^T with q1 in [0, 1].",
    level: "moderate",
    codeExample: "q = [q1, 1 - q1];"
  },
  {
    question: "What is the equation for the expected payout line against Row Ai in an mx2 game?",
    shortAnswer: "E(Ai, q) = q1 * ai1 + (1 - q1) * ai2 = (ai1 - ai2) * q1 + ai2.",
    explanation: "Linear payout function as a function of q1.",
    hint: "E(Ai, q) = (ai1 - ai2)*q1 + ai2.",
    level: "moderate",
    codeExample: "E_i = (ai1 - ai2) * q1 + ai2;"
  },
  {
    question: "What are the two boundary endpoint coordinates for the expected payout line of Row Ai?",
    shortAnswer: "At q1 = 0 (playing pure B2): E = ai2; at q1 = 1 (playing pure B1): E = ai1.",
    explanation: "Endpoints on the left (q1=0) and right (q1=1) vertical axes.",
    hint: "Left axis (q1=0): ai2; Right axis (q1=1): ai1.",
    level: "moderate",
    codeExample: "leftEndpoint = [0, ai2]; rightEndpoint = [1, ai1];"
  },
  {
    question: "Why does Player B evaluate the UPPER Envelope in an mx2 game?",
    shortAnswer: "Because Player A is a maximizer who will choose the row yielding the highest expected payout for any chosen q1. Player B must minimize over this worst-case upper liability ceiling (Minimax).",
    explanation: "Worst-case liability capping rationale for the column player.",
    hint: "Player A maximizes payout, creating an upper envelope boundary.",
    level: "expert",
    codeExample: "UpperEnvelope(q1) = Math.max(...allRows.map(row => row.eval(q1)));"
  },
  {
    question: "Suppose a 4x2 game has matrix A = [[20, 50], [40, 10], [30, 60], [50, 20]] (in ₹ Thousands). What is the slope of Line A1?",
    shortAnswer: "Slope m1 = a11 - a12 = 20 - 50 = -30 (downward sloping line).",
    explanation: "Slope equals right endpoint minus left endpoint.",
    hint: "Slope = 20 - 50 = -30.",
    level: "moderate",
    codeExample: "slope_A1 = 20 - 50; // -30"
  },
  {
    question: "For the matrix A = [[20, 50], [40, 10], [30, 60], [50, 20]], what is the slope of Line A2?",
    shortAnswer: "Slope m2 = a21 - a22 = 40 - 10 = +30 (upward sloping line).",
    explanation: "Slope equals 40 - 10 = +30.",
    hint: "Slope = 40 - 10 = +30.",
    level: "moderate",
    codeExample: "slope_A2 = 40 - 10; // +30"
  },
  {
    question: "What is the intersection point of Line A1 (E1 = -30q1 + 50) and Line A2 (E2 = 30q1 + 10)?",
    shortAnswer: "-30q1 + 50 = 30q1 + 10 ➔ 60q1 = 40 ➔ q1* = 40/60 = 2/3 (≈ 0.667). Game Value v* = -30(2/3) + 50 = +₹30k (₹30,000).",
    explanation: "Solving the intersection of active rows.",
    hint: "q1* = 2/3, v* = ₹30,000.",
    level: "moderate",
    codeExample: "q1 = (50 - 10) / ((40 - 10) - (20 - 50)); // 2/3"
  },
  {
    question: "Why does Line A3 [30, 60] NOT affect the Minimax trough in this 4x2 game?",
    shortAnswer: "At q1 = 2/3, Line A3 gives E3 = 30(2/3) + 60(1/3) = 20 + 20 = ₹40k > ₹30k, so Line A3 lies strictly ABOVE the Minimax trough formed by A1 and A2, and Player A will play {A1, A2}.",
    explanation: "Checking boundary lines at the envelope trough.",
    hint: "Line A3 is above the trough; the minimum of the upper envelope is at A1 and A2.",
    level: "expert",
    codeExample: "assert(E3(2/3) > E1(2/3));"
  },
  {
    question: "How does solving an mx2 game graphically compare to solving an m-variable Linear Program?",
    shortAnswer: "The graphical method allows instant visual identification of the 2 active rows forming the upper envelope trough, converting an m-variable LP problem into a 10-second 2x2 algebraic solution.",
    explanation: "Efficiency advantage of the graphical method.",
    hint: "Graphical method visually identifies the 2 active rows.",
    level: "intermediate",
    codeExample: "Advantage: Instant2x2IdentificationOverSimplexLP."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating mx2 game payoffs and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Minimax Trough Value = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of mx2 Games?",
    shortAnswer: "'Parameterize Player B's strategy as q1; plot linear expected payout lines E(Ai, q) between left (ai2) and right (ai1) axes; construct the Upper Envelope; locate the Minimax trough; and report the Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all mx2 game mechanics.",
    hint: "Parameterize q1 → Plot row lines → Upper Envelope → Minimax Trough in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ParameterizeQ1() → PlotRowLines() → UpperEnvelope() → MinimaxTrough(₹)."
  }
];

export default questions;
