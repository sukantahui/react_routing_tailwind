// topic4_questions.js
// 30 Moderate to Expert Questions on the Value of the Game in Game Theory

const questions = [
  {
    question: "What is the formal definition of the 'Value of the Game' (v*) in Game Theory?",
    shortAnswer: "The expected payoff received by Player A (and conceded by Player B) when both players adopt their respective optimal strategies in Indian Rupees (₹).",
    explanation: "Represents the fair economic valuation of the game under optimal rational play.",
    hint: "The expected payoff when both players play optimally in ₹.",
    level: "moderate",
    codeExample: "ValueOfTheGame = optimal_p.dot(A).dot(optimal_q);"
  },
  {
    question: "How is the Value of the Game determined in a Strictly Determined Game?",
    shortAnswer: "v* = a_i*j* = Maximin = Minimax; the exact numerical entry at the Saddle Point.",
    explanation: "Direct lookup at the saddle point coordinates.",
    hint: "v* = Maximin = Minimax = a_i*j*.",
    level: "moderate",
    codeExample: "v_star = matrix[saddleRow][saddleCol];"
  },
  {
    question: "What is the fundamental inequality bounding the Value of the Game (v*)?",
    shortAnswer: "v_lower <= v* <= v_upper, or max_i min_j a_ij <= v* <= min_j max_i a_ij.",
    explanation: "The true game value is always sandwiched between the Maximin floor and Minimax ceiling.",
    hint: "v_lower <= v* <= v_upper.",
    level: "expert",
    codeExample: "GameBounds: v_lower <= v_star && v_star <= v_upper;"
  },
  {
    question: "What is a 'Fair Game'?",
    shortAnswer: "A two-person zero-sum game in which the Value of the Game is exactly zero (v* = ₹0).",
    explanation: "Neither player has an inherent mathematical advantage.",
    hint: "A game where v* = 0.",
    level: "moderate",
    codeExample: "isFairGame = (v_star === 0);"
  },
  {
    question: "What does it mean if the Value of the Game is strictly positive (v* > 0)?",
    shortAnswer: "The game has an inherent structural bias in favor of Player A (Row Player), who expects to win ₹v* per round under optimal play.",
    explanation: "Row player has a positive expected return.",
    hint: "Favors Player A (Row Player).",
    level: "moderate",
    codeExample: "bias = v_star > 0 ? 'Player A Advantage' : 'Player B Advantage';"
  },
  {
    question: "What does it mean if the Value of the Game is strictly negative (v* < 0)?",
    shortAnswer: "The game has an inherent structural bias in favor of Player B (Column Player), who expects to win ₹|v*| per round (Player A loses ₹|v*|).",
    explanation: "Column player has a positive expected return.",
    hint: "Favors Player B (Column Player).",
    level: "moderate",
    codeExample: "bias = v_star < 0 ? 'Player B Advantage' : 'Player A Advantage';"
  },
  {
    question: "If a matrix is shifted by adding a constant c to every cell, what happens to the Value of the Game?",
    shortAnswer: "The new Value of the Game becomes: v'* = v* + c, while the optimal strategies remain identical.",
    explanation: "Constant shift invariance theorem.",
    hint: "v'* = v* + c.",
    level: "moderate",
    codeExample: "v_new = v_old + c;"
  },
  {
    question: "If a matrix is scaled by multiplying every cell by a positive scalar k > 0, what happens to the Value of the Game?",
    shortAnswer: "The new Value of the Game becomes: v'* = k * v*, while the optimal strategies remain identical.",
    explanation: "Scalar scaling invariance theorem.",
    hint: "v'* = k * v*.",
    level: "moderate",
    codeExample: "v_new = k * v_old;"
  },
  {
    question: "Suppose Debangshu in Barrackpore is evaluating a foundry contract game with saddle point v* = +₹40,000. How much compensation should Player B demand before agreeing to play this game?",
    shortAnswer: "An upfront side-payment of ₹40,000 to neutralize Player A's structural advantage and make the game fair (v* = ₹0).",
    explanation: "Side payments equalize games with non-zero values.",
    hint: "A side-payment of ₹40,000.",
    level: "expert",
    codeExample: "SidePayment = v_star = 40000;"
  },
  {
    question: "Can a game with large numbers in the matrix still be a Fair Game?",
    shortAnswer: "YES! If the positive and negative payoffs balance out such that Maximin = Minimax = ₹0, the game is strictly fair regardless of cell magnitudes.",
    explanation: "Fairness depends solely on v* = 0, not cell sizes.",
    hint: "Yes, as long as v* = 0.",
    level: "moderate",
    codeExample: "FairMatrix = [[100000, -100000], [-100000, 100000]]; // v* = 0"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating the Value of the Game, player advantages, and side payments in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Game v* = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of the Value of the Game in Game Theory?",
    shortAnswer: "'The Value of the Game v* is the expected monetary return under optimal play in Indian Rupees (₹); it is bounded by v_lower <= v* <= v_upper; strictly determined games have v* = a_i*j*; a game is fair if and only if v* = ₹0!'",
    explanation: "This complete rule captures all game valuation principles.",
    hint: "Expected return under optimal play → v_lower <= v* <= v_upper → Fair if v* = 0 in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ComputeBounds(v_lower, v_upper) → DetermineVStar(₹) → EvaluateFairness()."
  }
];

export default questions;
