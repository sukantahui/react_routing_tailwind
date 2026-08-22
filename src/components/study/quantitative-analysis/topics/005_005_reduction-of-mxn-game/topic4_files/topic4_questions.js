// topic4_questions.js
// 30 Moderate to Expert Questions on Reduction to 2xn and mx2 Cases

const questions = [
  {
    question: "What is a '2xn game' and what analytical method is used to solve it?",
    shortAnswer: "A 2xn game has 2 rows (Player A has 2 strategies) and n columns (n >= 3). It is solved using the 2xn Graphical Method by finding the highest point (Maximin peak) on the Lower Envelope of expected payoff lines.",
    explanation: "Standard 2xn game definition and graphical solution approach.",
    hint: "2 rows and n >= 3 cols; solved by Maximin on Lower Envelope.",
    level: "moderate",
    codeExample: "solve2xn: (matrix2xn) => plotLines() -> findLowerEnvelope() -> findMaximinPeak();"
  },
  {
    question: "What is an 'mx2 game' and what analytical method is used to solve it?",
    shortAnswer: "An mx2 game has m rows (m >= 3) and 2 columns (Player B has 2 strategies). It is solved using the mx2 Graphical Method by finding the lowest point (Minimax trough) on the Upper Envelope of expected payout lines.",
    explanation: "Standard mx2 game definition and graphical solution approach.",
    hint: "m >= 3 rows and 2 cols; solved by Minimax on Upper Envelope.",
    level: "moderate",
    codeExample: "solve_mx2: (matrix_mx2) => plotLines() -> findUpperEnvelope() -> findMinimaxTrough();"
  },
  {
    question: "Why do we construct the LOWER Envelope in a 2xn game?",
    shortAnswer: "Because Player B minimizes Player A's payoff; for any chosen probability p1, Player B will choose the column with the minimum expected payoff. Player A then maximizes over this worst-case lower boundary.",
    explanation: "Mathematical rationale behind the lower envelope.",
    hint: "Player B forces Player A to the minimum payoff line.",
    level: "expert",
    codeExample: "lowerEnvelope(p1) = Math.min(...colLines.map(line => line(p1)));"
  },
  {
    question: "Why do we construct the UPPER Envelope in an mx2 game?",
    shortAnswer: "Because Player A maximizes payoff; for any chosen probability q1 by Player B, Player A will choose the row with the maximum expected payout. Player B then minimizes over this worst-case upper boundary.",
    explanation: "Mathematical rationale behind the upper envelope.",
    hint: "Player A forces Player B to the maximum payout line.",
    level: "expert",
    codeExample: "upperEnvelope(q1) = Math.max(...rowLines.map(line => line(q1)));"
  },
  {
    question: "How does the graphical method reduce a 2xn or mx2 game to an active 2x2 submatrix?",
    shortAnswer: "The peak of the lower envelope (or trough of the upper envelope) occurs at the intersection of two specific strategy lines. Those two lines define the active 2x2 submatrix!",
    explanation: "Sub-game extraction via envelope vertices.",
    hint: "The two lines intersecting at the optimum form the active 2x2 submatrix.",
    level: "moderate",
    codeExample: "activeSubgame = [lineA, lineB]; solve2x2(activeSubgame);"
  },
  {
    question: "Suppose a 2x3 game has lines E1(p1) = 20p1 + 40(1-p1), E2(p1) = 50p1 + 10(1-p1), and E3(p1) = 60p1 + 30(1-p1) (in ₹ Thousands). What is the intersection of E1 and E2?",
    shortAnswer: "20p1 + 40 - 40p1 = 50p1 + 10 - 10p1 ➔ 40 - 20p1 = 10 + 40p1 ➔ 60p1 = 30 ➔ p1* = 0.50. Payoff = 20(0.5) + 40(0.5) = ₹30k (₹30,000).",
    explanation: "Line intersection calculation.",
    hint: "p1* = 0.50, Value = ₹30,000.",
    level: "moderate",
    codeExample: "p1 = (40 - 10) / ((50 - 10) - (20 - 40)); // 0.50"
  },
  {
    question: "In the 2x3 game with lines E1, E2, E3, what is E3(0.50)?",
    shortAnswer: "E3(0.50) = 60(0.5) + 30(0.5) = ₹45k. Since ₹45k > ₹30k, line E3 is ABOVE the intersection of E1 and E2, confirming that E1 and E2 form the lower envelope peak!",
    explanation: "Envelope envelope dominance check.",
    hint: "E3(0.5) = ₹45,000 > ₹30,000 (lies strictly above lower envelope).",
    level: "expert",
    codeExample: "assert(E3(0.5) > E1(0.5));"
  },
  {
    question: "Can an mx2 game be transformed into a 2xn game?",
    shortAnswer: "YES! Transposing the payoff matrix converts an mx2 game into a 2xm game for the other player with inverted payoff signs.",
    explanation: "Duality between 2xn and mx2 games.",
    hint: "Yes, via matrix transposition and role reversal.",
    level: "intermediate",
    codeExample: "A_transposed = transpose(A);"
  },
  {
    question: "What happens if three or more lines intersect at the exact same Maximin peak point?",
    shortAnswer: "Any pair of lines with opposite slopes can be selected to form an active 2x2 submatrix, yielding identical probabilities and the exact same Game Value v*.",
    explanation: "Degeneracy / multiple active strategy choices.",
    hint: "Any valid intersecting pair yields the same game value v*.",
    level: "expert",
    codeExample: "v_star_pair1 === v_star_pair2; // true"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating 2xn and mx2 game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Maximin Peak Value = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Reduction to 2xn and mx2 Cases?",
    shortAnswer: "'Plot expected payoff lines over the probability axis; find the Maximin peak on the Lower Envelope (for 2xn) or Minimax trough on the Upper Envelope (for mx2); extract the active 2x2 submatrix; and report the Game Value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all 2xn and mx2 graphical reduction mechanics.",
    hint: "Plot lines -> Lower/Upper envelope -> Extract 2x2 -> Report in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: PlotLines() -> Envelopes() -> Extract2x2() -> ReportInRupees(₹)."
  }
];

export default questions;
