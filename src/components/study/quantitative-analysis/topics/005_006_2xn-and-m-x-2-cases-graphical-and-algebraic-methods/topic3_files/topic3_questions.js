// topic3_questions.js
// 30 Moderate to Expert Questions on Plotting Strategy Lines in Game Theory

const questions = [
  {
    question: "What are the exact coordinate positions of the left and right axes when plotting 2xn strategy lines?",
    shortAnswer: "The left vertical axis is at p1 = 0 (representing pure strategy A2) and the right vertical axis is at p1 = 1 (representing pure strategy A1).",
    explanation: "Standard dual-axis layout for graphical game theory.",
    hint: "Left axis: p1=0 (A2); Right axis: p1=1 (A1).",
    level: "moderate",
    codeExample: "axesLayout = { left: 'p1 = 0 (Pure A2)', right: 'p1 = 1 (Pure A1)' };"
  },
  {
    question: "When plotting Column Bj in a 2xn game, which payoff value goes on the left axis (p1=0)?",
    shortAnswer: "The payoff a2j (from Row 2) goes on the left axis because at p1 = 0, Player A plays pure A2 with 100% probability.",
    explanation: "Left axis endpoint definition for 2xn games.",
    hint: "a2j goes on the left axis (p1=0).",
    level: "moderate",
    codeExample: "leftPoint = [0, a2j];"
  },
  {
    question: "When plotting Column Bj in a 2xn game, which payoff value goes on the right axis (p1=1)?",
    shortAnswer: "The payoff a1j (from Row 1) goes on the right axis because at p1 = 1, Player A plays pure A1 with 100% probability.",
    explanation: "Right axis endpoint definition for 2xn games.",
    hint: "a1j goes on the right axis (p1=1).",
    level: "moderate",
    codeExample: "rightPoint = [1, a1j];"
  },
  {
    question: "What is the formula for calculating the slope of strategy line Bj in a 2xn game?",
    shortAnswer: "Slope m_j = a1j - a2j (the right-endpoint payoff minus the left-endpoint payoff).",
    explanation: "Slope of the linear payoff function.",
    hint: "m_j = a1j - a2j.",
    level: "moderate",
    codeExample: "slope_j = a1j - a2j;"
  },
  {
    question: "What does a negative slope (m_j < 0) indicate for strategy line Bj?",
    shortAnswer: "It means a1j < a2j: as Player A increases the probability of playing A1 (p1), the expected payoff from Column Bj decreases (downward sloping line).",
    explanation: "Geometric and strategic meaning of negative slope.",
    hint: "Downward sloping line; payoff decreases as p1 increases.",
    level: "intermediate",
    codeExample: "isDecreasing = (a1j < a2j);"
  },
  {
    question: "What is the algebraic formula for the intersection probability p1 of two strategy lines Bj and Bk?",
    shortAnswer: "p1 = (a2k - a2j) / ((a1j - a2j) - (a1k - a2k)) = (a2k - a2j) / ((a1j - a1k) - (a2j - a2k)).",
    explanation: "Equating E_j(p1) = E_k(p1) and solving for p1.",
    hint: "p1 = (a2k - a2j) / (m_j - m_k).",
    level: "expert",
    codeExample: "p1_intersection = (a2k - a2j) / ((a1j - a2j) - (a1k - a2k));"
  },
  {
    question: "Suppose Line B1 has endpoints (0, 40) and (1, 20), and Line B2 has endpoints (0, 10) and (1, 50) (in ₹ Thousands). What is their exact intersection point?",
    shortAnswer: "40 - 20p1 = 10 + 40p1 ➔ 60p1 = 30 ➔ p1 = 0.50. Payoff = 40 - 20(0.50) = ₹30k (₹30,000).",
    explanation: "Numerical line intersection calculation.",
    hint: "p1 = 0.50, Payoff = ₹30,000.",
    level: "moderate",
    codeExample: "p1 = (40 - 10) / (40 - (-20)); // 30 / 60 = 0.50"
  },
  {
    question: "What happens if two strategy lines are parallel (m_j = m_k)?",
    shortAnswer: "They never intersect in (0, 1). The line with the smaller left-endpoint is strictly dominated by the other line across all p1 in [0, 1] and can be ignored.",
    explanation: "Parallel strategy lines and absolute dominance.",
    hint: "Parallel lines never intersect; the lower/higher line dominates completely.",
    level: "expert",
    codeExample: "if (m_j === m_k) pruneDominatedParallelLine();"
  },
  {
    question: "How should negative payoff entries be plotted on the vertical axes?",
    shortAnswer: "By extending the vertical axes downward below the zero baseline with uniform spacing (e.g. 0, -10, -20), marking negative coordinates accurately.",
    explanation: "Handling negative payoffs in graphical axes.",
    hint: "Extend axes downwards below zero.",
    level: "moderate",
    codeExample: "yScale = scaleLinear().domain([minPayoff, maxPayoff]);"
  },
  {
    question: "What currency symbol must ALWAYS be used when labeling expected payoff axes and intersection values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Intersection Payoff = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Plotting Strategy Lines?",
    shortAnswer: "'Mark (0, a2j) on the left axis and (1, a1j) on the right axis; join endpoints to form straight lines; compute slopes and intersection points; shade the active boundary envelope; and label all values in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all strategy line plotting mechanics.",
    hint: "Mark endpoints → Join lines → Slopes & intersections → Shade envelope in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: MarkEndpoints() → DrawLines() → CalcIntersections() → ShadeEnvelope(₹)."
  }
];

export default questions;
