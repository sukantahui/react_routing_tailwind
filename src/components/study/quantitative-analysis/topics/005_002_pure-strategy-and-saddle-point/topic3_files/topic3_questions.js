// topic3_questions.js
// 30 Moderate to Expert Questions on the Saddle Point Concept in Game Theory

const questions = [
  {
    question: "What is the formal mathematical definition of a 'Saddle Point' in Game Theory?",
    shortAnswer: "A cell (i*, j*) in a payoff matrix whose entry a_i*j* is simultaneously the minimum in its row and the maximum in its column, satisfying: Maximin = Minimax = a_i*j* = v*.",
    explanation: "Represents a stable pure-strategy Nash equilibrium in a two-person zero-sum game.",
    hint: "Simultaneously min in its row and max in its column (Maximin = Minimax).",
    level: "moderate",
    codeExample: "isSaddle = (r, c) => matrix[r][c] === Math.min(...matrix[r]) && matrix[r][c] === Math.max(...matrix.map(row => row[c]));"
  },
  {
    question: "Why is this equilibrium point named a 'Saddle Point'?",
    shortAnswer: "From the geometric shape of a horse's saddle: along one cross-section (the row) it is the lowest point (minimum), while along the perpendicular cross-section (the column) it is the highest point (maximum).",
    explanation: "Topological minimax saddle surface analogy.",
    hint: "Shape of a horse saddle (minimum in one direction, maximum in the perpendicular direction).",
    level: "moderate",
    codeExample: "SaddleShape: MinInRow && MaxInColumn;"
  },
  {
    question: "What is the Nash Equilibrium condition for a Saddle Point (i*, j*)?",
    shortAnswer: "For all i, a_i,j* <= a_i*,j*, and for all j, a_i*,j >= a_i*,j*; neither player has any incentive to unilaterally deviate from their optimal strategy.",
    explanation: "Unilateral deviation strictly reduces Player A's payoff or increases Player B's payout.",
    hint: "a_i,j* <= a_i*,j* <= a_i*,j for all alternative i and j.",
    level: "expert",
    codeExample: "NashCondition: matrix[i][j_star] <= v_star && v_star <= matrix[i_star][j];"
  },
  {
    question: "What happens if a Payoff Matrix has MULTIPLE Saddle Points?",
    shortAnswer: "All saddle points MUST have the exact same numerical payoff value (v*), and any combination of optimal row and column strategies from these saddle points also forms a valid saddle point equilibrium.",
    explanation: "The set of saddle points forms a rectangular sub-grid of interchangeable optimal strategies.",
    hint: "All have the exact same value v* and are interchangeable.",
    level: "expert",
    codeExample: "allSaddles.every(s => s.value === v_star); // true"
  },
  {
    question: "What does the existence of a Saddle Point imply about the need for Mixed Strategies?",
    shortAnswer: "If a saddle point exists, mixed strategies are NOT needed; the optimal solution is achieved completely and deterministically in Pure Strategies.",
    explanation: "Pure strategies are completely stable at the saddle point.",
    hint: "Mixed strategies are unnecessary; pure strategies are 100% optimal.",
    level: "moderate",
    codeExample: "if (hasSaddlePoint) { optimalStrategy = 'Pure'; }"
  },
  {
    question: "Suppose a 2x2 matrix is [[10, 20], [30, 40]]. Find the saddle point and the value of the game in ₹.",
    shortAnswer: "Row Mins: [10, 30] -> Maximin = 30; Col Maxs: [30, 40] -> Minimax = 30. Saddle point is at (A2, B1) with Value of the Game = ₹30.",
    explanation: "Cell (2,1) is min in row 2 (30 <= 40) and max in col 1 (30 >= 10).",
    hint: "Saddle point at (A2, B1) with value ₹30.",
    level: "moderate",
    codeExample: "Matrix = [[10, 20], [30, 40]] => SaddlePoint: (2, 1) = 30."
  },
  {
    question: "Suppose a 2x2 matrix is [[20, -10], [-5, 30]]. Does a saddle point exist?",
    shortAnswer: "Row Mins: [-10, -5] -> Maximin = -5. Col Maxs: [20, 30] -> Minimax = 20. Since -5 != 20 (Maximin < Minimax), NO saddle point exists.",
    explanation: "Non-strictly determined game requiring mixed strategies.",
    hint: "No, Maximin (-5) < Minimax (20).",
    level: "moderate",
    codeExample: "Maximin = -5, Minimax = 20 => No Saddle Point."
  },
  {
    question: "What is a 'Strictly Determined Game' in relation to the Saddle Point?",
    shortAnswer: "A two-person zero-sum game is called Strictly Determined if and only if it possesses at least one Saddle Point in pure strategies.",
    explanation: "Definition of strict determination.",
    hint: "A game that has a pure saddle point.",
    level: "moderate",
    codeExample: "isStrictlyDetermined = hasSaddlePoint;"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds a saddle point at (A2, B1) = ₹40,000 for a casting contract. What happens if Debangshu unilaterally switches to A1?",
    shortAnswer: "Debangshu's profit will decrease or remain the same (payoff <= ₹40,000), because A2 is his best response against Player B's optimal strategy B1.",
    explanation: "Defines the self-enforcing stability of Nash equilibrium.",
    hint: "Debangshu's profit will decrease or stay the same.",
    level: "moderate",
    codeExample: "DeviationLoss: matrix[0][0] <= matrix[1][0];"
  },
  {
    question: "Can a zero-sum game have a Saddle Point with a value of ZERO (v* = ₹0)?",
    shortAnswer: "YES! A saddle point with v* = ₹0 represents a Fair Game where neither player gains or loses under optimal play.",
    explanation: "Zero-valued saddle point defines fair equilibrium.",
    hint: "Yes, this defines a Fair Game.",
    level: "moderate",
    codeExample: "FairSaddlePoint: v_star === 0;"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating saddle point payoffs, game values, and contract profits in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Saddle Point Value = ₹40,000'"
  },
  {
    question: "What is the ultimate golden rule of the Saddle Point in Game Theory?",
    shortAnswer: "'A Saddle Point is the unshakeable equilibrium where Maximin = Minimax = v*; it is simultaneously the minimum in its row and the maximum in its column; neither player can benefit by deviating unilaterally in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all saddle point mechanics.",
    hint: "Maximin = Minimax = v* -> Min in row & Max in col -> Stable Nash equilibrium in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: CheckMaximinEqualsMinimax() -> LocateRowMinColMax() -> VerifyNashStability(v*, ₹)."
  }
];

export default questions;
