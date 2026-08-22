// topic0_questions.js
// 30 Moderate to Expert Questions on 2xn Games in Game Theory

const questions = [
  {
    question: "What is the structural definition of a 2xn game?",
    shortAnswer: "A 2xn game is a Two-Person Zero-Sum Game where Player A (the row maximizer) has exactly 2 strategies, and Player B (the column minimizer) has n strategies (where n >= 3).",
    explanation: "Standard matrix dimension definition for 2xn games.",
    hint: "Player A has 2 strategies; Player B has n >= 3 strategies.",
    level: "moderate",
    codeExample: "is2xn = (matrix.length === 2 && matrix[0].length >= 3);"
  },
  {
    question: "How is Player A's mixed strategy parameterized in a 2xn game?",
    shortAnswer: "As a 1D probability variable p1 in [0, 1], where p = [p1, 1 - p1]^T (probability of playing Row 1 is p1, and Row 2 is 1 - p1).",
    explanation: "Probability simplex parameterization for 2-action players.",
    hint: "p = [p1, 1 - p1]^T with p1 in [0, 1].",
    level: "moderate",
    codeExample: "p = [p1, 1 - p1];"
  },
  {
    question: "What is the equation for the expected payoff line against Column Bj in a 2xn game?",
    shortAnswer: "E(p, Bj) = p1 * a1j + (1 - p1) * a2j = (a1j - a2j) * p1 + a2j.",
    explanation: "Linear payoff function as a function of p1.",
    hint: "E(p, Bj) = (a1j - a2j)*p1 + a2j.",
    level: "moderate",
    codeExample: "E_j = (a1j - a2j) * p1 + a2j;"
  },
  {
    question: "What are the two boundary endpoint coordinates for the expected payoff line of Column Bj?",
    shortAnswer: "At p1 = 0 (playing pure A2): E = a2j; at p1 = 1 (playing pure A1): E = a1j.",
    explanation: "Endpoints on the left (p1=0) and right (p1=1) vertical axes.",
    hint: "Left axis (p1=0): a2j; Right axis (p1=1): a1j.",
    level: "moderate",
    codeExample: "leftEndpoint = [0, a2j]; rightEndpoint = [1, a1j];"
  },
  {
    question: "Why does Player A evaluate the LOWER Envelope in a 2xn game?",
    shortAnswer: "Because Player B is a minimizer who will choose the column yielding the lowest expected payoff for any p1. Player A must maximize over this worst-case lower floor (Maximin).",
    explanation: "Worst-case defense rationale for the row player.",
    hint: "Player B minimizes payoff, creating a lower envelope boundary.",
    level: "expert",
    codeExample: "LowerEnvelope(p1) = Math.min(...allColumns.map(col => col.eval(p1)));"
  },
  {
    question: "Suppose a 2x3 game has A = [[₹20k, ₹50k, ₹60k], [₹40k, ₹10k, ₹30k]]. What is the slope of Line B1?",
    shortAnswer: "Slope m1 = a11 - a21 = 20 - 40 = -20 (downward sloping line).",
    explanation: "Slope equals right endpoint minus left endpoint.",
    hint: "Slope = 20 - 40 = -20.",
    level: "moderate",
    codeExample: "slope_B1 = 20 - 40; // -20"
  },
  {
    question: "For A = [[20, 50, 60], [40, 10, 30]], what is the slope of Line B2?",
    shortAnswer: "Slope m2 = a12 - a22 = 50 - 10 = +40 (upward sloping line).",
    explanation: "Slope equals 50 - 10 = +40.",
    hint: "Slope = 50 - 10 = +40.",
    level: "moderate",
    codeExample: "slope_B2 = 50 - 10; // +40"
  },
  {
    question: "Why must the Maximin peak be formed by two lines with OPPOSITE signs of slope?",
    shortAnswer: "Because a peak requires one line to rise (positive slope) and another to fall (negative slope). If both slopes had the same sign, the envelope would be monotonic and peak at an endpoint (a pure strategy).",
    explanation: "Geometric condition for an interior mixed strategy optimum.",
    hint: "A peak requires an ascending line and a descending line.",
    level: "expert",
    codeExample: "assert(slope1 * slope2 < 0); // Opposite signs"
  },
  {
    question: "Can a 2xn game have a pure saddle point?",
    shortAnswer: "YES! If Maximin == Minimax on the original matrix, the lower envelope will reach its maximum at an endpoint (p1 = 0 or p1 = 1), indicating a pure strategy solution.",
    explanation: "Endpoint optimum corresponds to a pure saddle point.",
    hint: "Yes, when the maximum occurs at p1=0 or p1=1.",
    level: "moderate",
    codeExample: "isPureOptimum = (p1_star === 0 || p1_star === 1);"
  },
  {
    question: "How does solving a 2xn game graphically compare to solving it algebraically?",
    shortAnswer: "The graphical method visually identifies the 2 active intersecting columns forming the lower envelope peak, allowing the analyst to extract and solve the exact 2x2 sub-game immediately.",
    explanation: "Graphical identification followed by 2x2 algebraic solution.",
    hint: "Graphical method identifies active columns; algebraic formulas compute exact numbers.",
    level: "intermediate",
    codeExample: "Workflow: GraphicalIdentification() -> 2x2ClosedFormSolve();"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating 2xn game payoffs and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of 2xn Game = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of 2xn Games?",
    shortAnswer: "'Parameterize Player A's strategy as p1; plot linear expected payoff lines E(p, Bj) between left (a2j) and right (a1j) axes; construct the Lower Envelope; locate the Maximin peak; and report the Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all 2xn game mechanics.",
    hint: "Parameterize p1 -> Plot lines -> Lower Envelope -> Maximin Peak in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ParameterizeP1() -> PlotColLines() -> LowerEnvelope() -> MaximinPeak(₹)."
  }
];

export default questions;
