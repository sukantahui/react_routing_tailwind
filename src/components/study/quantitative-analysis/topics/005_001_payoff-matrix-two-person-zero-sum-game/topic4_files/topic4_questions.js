// topic4_questions.js
// 30 Moderate to Expert Questions on Two-Person Zero-Sum Games

const questions = [
  {
    question: "What is the formal mathematical definition of a Two-Person Zero-Sum Game (TPZSG)?",
    shortAnswer: "A game involving exactly two rational players where the sum of their payoffs equals exactly zero for every possible joint strategy combination: u_A(s_A, s_B) + u_B(s_A, s_B) = 0.",
    explanation: "Represents pure, unadulterated competitive conflict.",
    hint: "Two players where total payoffs sum to zero across all outcomes (u_A + u_B = 0).",
    level: "moderate",
    codeExample: "TPZSG: (sA, sB) => uA(sA, sB) + uB(sA, sB) === 0;"
  },
  {
    question: "What is John von Neumann's celebrated Minimax Theorem (1928)?",
    shortAnswer: "Every finite two-person zero-sum game has a unique equilibrium game value v* and optimal mixed strategy vectors p* and q* such that: max_p min_q (p^T A q) = min_q max_p (p^T A q) = v*.",
    explanation: "Proves that every finite matrix game has an optimal solution in mixed strategies.",
    hint: "Every finite zero-sum game has a unique value v* and optimal mixed strategies.",
    level: "expert",
    codeExample: "MinimaxTheorem: max_p min_q (p^T * A * q) === min_q max_p (p^T * A * q) === v_star;"
  },
  {
    question: "What is a 'Strictly Determined Game'?",
    shortAnswer: "A two-person zero-sum game that has a Saddle Point in pure strategies (i.e. Maximin = Minimax = v); neither player has any incentive to deviate from their optimal pure strategy.",
    explanation: "Pure strategy choices are mutually optimal and stable.",
    hint: "A game with a pure strategy saddle point (Maximin = Minimax).",
    level: "moderate",
    codeExample: "isStrictlyDetermined = (maximin === minimax);"
  },
  {
    question: "What is a 'Non-Strictly Determined Game'?",
    shortAnswer: "A zero-sum game where Maximin < Minimax (no pure saddle point); the game must be solved using mixed strategies to achieve equilibrium.",
    explanation: "Requires probabilistic randomization to eliminate predictability.",
    hint: "Maximin < Minimax; solved via mixed strategies.",
    level: "moderate",
    codeExample: "isNonStrictlyDetermined = (maximin < minimax);"
  },
  {
    question: "How is a 'Constant-Sum Game' transformed into an equivalent Zero-Sum Game?",
    shortAnswer: "By subtracting the constant k/2 (or appropriate constant) from every cell; this shifts all payoffs equally without changing any optimal strategies or saddle point locations.",
    explanation: "Constant-sum games are strategically isomorphic to zero-sum games.",
    hint: "Subtract the constant from all cells; strategic rankings remain identical.",
    level: "intermediate",
    codeExample: "toZeroSum = (matrix, k) => matrix.map(row => row.map(v => v - k));"
  },
  {
    question: "What is the 'Value of the Game' (v*) in a TPZSG?",
    shortAnswer: "The expected payoff Player A receives (and Player B concedes) when both players play their respective optimal strategies in Indian Rupees (₹).",
    explanation: "Represents the fair monetary valuation of the game.",
    hint: "The expected payoff at optimal equilibrium in ₹.",
    level: "moderate",
    codeExample: "gameValue = optimal_p.dot(A).dot(optimal_q);"
  },
  {
    question: "What is a 'Fair Game'?",
    shortAnswer: "A two-person zero-sum game in which the Value of the Game is exactly zero (v* = ₹0).",
    explanation: "Neither player has an inherent structural advantage.",
    hint: "A game where v* = 0.",
    level: "moderate",
    codeExample: "isFairGame = (gameValue === 0);"
  },
  {
    question: "If a game has value v* = +₹50,000, which player has the structural advantage?",
    shortAnswer: "Player A (Row Player), because Player A is guaranteed an expected gain of ₹50,000 per round under optimal play.",
    explanation: "Positive game value favors the row player.",
    hint: "Player A (Row Player).",
    level: "moderate",
    codeExample: "advantage = gameValue > 0 ? 'Player A' : 'Player B';"
  },
  {
    question: "If a game has value v* = -₹20,000, which player has the structural advantage?",
    shortAnswer: "Player B (Column Player), because Player B is guaranteed an expected gain of ₹20,000 per round (Player A loses ₹20,000).",
    explanation: "Negative game value favors the column player.",
    hint: "Player B (Column Player).",
    level: "moderate",
    codeExample: "advantage = gameValue < 0 ? 'Player B' : 'Player A';"
  },
  {
    question: "Can a Two-Person Zero-Sum Game have multiple saddle points?",
    shortAnswer: "YES! A game can have multiple saddle points, but ALL of them MUST have the exact same numerical payoff value (v*).",
    explanation: "Alternate saddle points yield identical game value.",
    hint: "Yes, but all saddle points yield the exact same game value.",
    level: "expert",
    codeExample: "allSaddlePoints.every(sp => sp.value === v_star); // true"
  },
  {
    question: "Suppose Debangshu in Barrackpore is playing a zero-sum bidding game with matrix [[40, 20], [30, 50]]. What is the optimal strategy and value of the game in ₹ Thousands?",
    shortAnswer: "Row min: [20, 30] -> Maximin = 30. Col max: [40, 50] -> Minimax = 40. Since 30 < 40, it is non-strictly determined; mixed strategies yield v* = ₹32.5k.",
    explanation: "Non-strictly determined 2x2 game.",
    hint: "Maximin = 30, Minimax = 40; requires mixed strategy solution.",
    level: "moderate",
    codeExample: "Matrix: [[40, 20], [30, 50]] => Mixed strategy solution."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating game values, player security levels, and strategic payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Zero-Sum Game = ₹32,500'"
  },
  {
    question: "What is the ultimate golden rule of Two-Person Zero-Sum Games?",
    shortAnswer: "'In a TPZSG, total wealth is strictly conserved (u_A + u_B = 0); the Minimax Theorem guarantees a unique game value v*; strictly determined games have pure saddle points; non-strictly determined games require mixed strategies; express all values in Indian Rupees (₹)!'",
    explanation: "This master synthesis captures all principles of Two-Person Zero-Sum Games.",
    hint: "Zero-sum conservation -> Minimax theorem -> Pure vs mixed equilibrium -> Value v* in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: EnforceZeroSum() -> ApplyMinimaxTheorem() -> FindEquilibrium(v*, ₹)."
  }
];

export default questions;
