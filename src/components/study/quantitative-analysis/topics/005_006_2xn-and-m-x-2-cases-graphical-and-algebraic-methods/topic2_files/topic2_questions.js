// topic2_questions.js
// 30 Moderate to Expert Questions on Graphical Method for 2xn and mx2 Games

const questions = [
  {
    question: "Why is the Graphical Method specifically applicable to 2xn and mx2 games, but NOT to 3x3 or 4x4 games?",
    shortAnswer: "Because having exactly 2 strategies reduces a player's probability distribution to a single independent variable (p1 in [0, 1] since p2 = 1 - p1), enabling 2D graphical line plotting. Three or more strategies require 2D simplices and 3D planes.",
    explanation: "Dimensionality rationale of 1D simplex plotting.",
    hint: "2 strategies = 1 independent probability variable (1D line segment [0, 1]).",
    level: "moderate",
    codeExample: "simplexDim = numStrategies - 1; // 2 - 1 = 1D line!"
  },
  {
    question: "In the Graphical Method for a 2xn game, what is plotted on the horizontal and vertical axes?",
    shortAnswer: "Horizontal axis: Player A's probability p1 in [0, 1]. Vertical axis: Expected Payoff E(p, Bj) in Indian Rupees (₹).",
    explanation: "Coordinate system definition for 2xn games.",
    hint: "Horizontal: p1 in [0, 1]; Vertical: Expected Payoff E in ₹.",
    level: "moderate",
    codeExample: "axes2xn = { x: 'p1 in [0, 1]', y: 'Expected Payoff E in ₹' };"
  },
  {
    question: "In the Graphical Method for an mx2 game, what is plotted on the horizontal and vertical axes?",
    shortAnswer: "Horizontal axis: Player B's probability q1 in [0, 1]. Vertical axis: Expected Payout E(Ai, q) in Indian Rupees (₹).",
    explanation: "Coordinate system definition for mx2 games.",
    hint: "Horizontal: q1 in [0, 1]; Vertical: Expected Payout E in ₹.",
    level: "moderate",
    codeExample: "axes_mx2 = { x: 'q1 in [0, 1]', y: 'Expected Payout E in ₹' };"
  },
  {
    question: "What is the complete geometric recipe for the 2xn Graphical Method?",
    shortAnswer: "1. Parameterize p1; 2. Plot n linear functions E(p, Bj) between left (a2j) and right (a1j) axes; 3. Draw the Lower Envelope floor; 4. Find the Maximin peak; 5. Extract the 2 intersecting columns to form a 2x2 game.",
    explanation: "5-step recipe for 2xn graphical solution.",
    hint: "Plot n lines → Lower envelope → Maximin peak → Extract 2x2 submatrix.",
    level: "moderate",
    codeExample: "recipe2xn: plotLines() → lowerEnvelope() → maximinPeak() → extract2x2();"
  },
  {
    question: "What is the complete geometric recipe for the mx2 Graphical Method?",
    shortAnswer: "1. Parameterize q1; 2. Plot m linear functions E(Ai, q) between left (ai2) and right (ai1) axes; 3. Draw the Upper Envelope ceiling; 4. Find the Minimax trough; 5. Extract the 2 intersecting rows to form a 2x2 game.",
    explanation: "5-step recipe for mx2 graphical solution.",
    hint: "Plot m lines → Upper envelope → Minimax trough → Extract 2x2 submatrix.",
    level: "moderate",
    codeExample: "recipe_mx2: plotLines() → upperEnvelope() → minimaxTrough() → extract2x2();"
  },
  {
    question: "Why must the intersecting lines forming an optimal interior peak or trough have opposite slope signs?",
    shortAnswer: "Because a peak requires one line to rise (m > 0) and one to fall (m < 0); if both had positive slopes, the peak would be at p1 = 1 (pure A1), and if both were negative, at p1 = 0 (pure A2).",
    explanation: "Mathematical necessity of opposite slopes for interior optima.",
    hint: "One line must rise and one must fall to create an apex.",
    level: "expert",
    codeExample: "assert(slope1 * slope2 < 0); // Opposing slopes required"
  },
  {
    question: "What does it mean if 3 lines intersect at the exact same Maximin peak point in a 2x4 game?",
    shortAnswer: "It indicates degeneracy: any pair of lines with opposite slopes can be extracted to solve the 2x2 submatrix, yielding identical probabilities p* and game value v*.",
    explanation: "Degeneracy handling in graphical game theory.",
    hint: "Any valid intersecting pair yields the same optimal p* and v*.",
    level: "expert",
    codeExample: "anyValidPair = choosePair(linesAtApex); solve2x2(anyValidPair);"
  },
  {
    question: "How does the Graphical Method guarantee zero loss of accuracy compared to Simplex LP?",
    shortAnswer: "Because after graphically identifying the 2 active boundary strategies, we solve the extracted 2x2 submatrix using exact closed-form algebraic formulas, yielding precise rational numbers.",
    explanation: "Hybrid visual identification + analytical computation guarantees exact precision.",
    hint: "Visual identification identifies active support; algebraic formulas compute exact fractions.",
    level: "moderate",
    codeExample: "Exactness: VisualSupportDiscovery + ClosedFormAlgebra = 100% Exact."
  },
  {
    question: "Can the graphical method be used if payoff matrix entries contain negative numbers?",
    shortAnswer: "YES! The vertical axis simply extends downwards into negative territory (e.g. -₹10k, -₹20k), and line plotting proceeds identically.",
    explanation: "Applicability across negative values.",
    hint: "Yes, the vertical axis extends below zero.",
    level: "moderate",
    codeExample: "supportsNegativeValues = true;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating graphical game values and payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Maximin Peak Value = ₹25,000'"
  },
  {
    question: "What is the ultimate golden rule of the Graphical Method?",
    shortAnswer: "'Plot linear strategy functions across the 1D probability simplex [0, 1]; construct the Lower Envelope (for 2xn) or Upper Envelope (for mx2); locate the optimal apex (Maximin peak or Minimax trough); extract the 2x2 active submatrix; and report the Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all Graphical Method mechanics.",
    hint: "Plot lines → Envelope → Apex → Extract 2x2 in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: Plot1DSimplex() → Envelope() → Apex() → Extract2x2(₹)."
  }
];

export default questions;
