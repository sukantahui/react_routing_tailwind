// topic6_questions.js
// 30 Moderate to Expert Questions on Numerical Examples of Pure Strategy & Saddle Point

const questions = [
  {
    question: "Solve the 2x2 game: A = [[20, 10], [40, 30]]. What is the saddle point and game value?",
    shortAnswer: "Row Mins: R1 = 10, R2 = 30 -> Maximin = 30; Col Maxs: C1 = 40, C2 = 30 -> Minimax = 30. Saddle point at (A2, B2) with Value of the Game v* = ₹30.",
    explanation: "Standard 2x2 pure saddle point identification.",
    hint: "Saddle at (A2, B2) with v* = ₹30.",
    level: "moderate",
    codeExample: "A = [[20, 10], [40, 30]]; // Saddle at (2, 2) = 30"
  },
  {
    question: "Solve the 3x3 game with negative entries: A = [[-10, 15, -20], [5, 25, 10], [-5, 0, -15]]. What are the optimal strategies?",
    shortAnswer: "Row Mins: [-20, 5, -15] -> Maximin = 5 (Row 2). Col Maxs: [5, 25, 10] -> Minimax = 5 (Col 1). Optimal strategies: (A2, B1) with v* = ₹5.",
    explanation: "Step-by-step extraction in the presence of negative payoffs.",
    hint: "Optimal: (A2, B1), v* = ₹5.",
    level: "moderate",
    codeExample: "A = [[-10, 15, -20], [5, 25, 10], [-5, 0, -15]]; // Saddle at (2, 1) = 5"
  },
  {
    question: "Solve the 3x4 rectangular game: A = [[3, 2, 4, 0], [3, 4, 2, 4], [4, 2, 4, 0]]. What is the saddle point?",
    shortAnswer: "Row Mins: [0, 2, 0] -> Maximin = 2 (Row 2). Col Maxs: [4, 4, 4, 4] -> Minimax = 4. Since Maximin (2) != Minimax (4), NO pure saddle point exists.",
    explanation: "Rectangular matrix requiring mixed strategy analysis.",
    hint: "No saddle point exists because Maximin (2) < Minimax (4).",
    level: "expert",
    codeExample: "Maximin = 2, Minimax = 4 => No Saddle Point."
  },
  {
    question: "Solve the 2x2 game: A = [[40, 40], [20, 40]]. Does it have multiple saddle points?",
    shortAnswer: "Row Mins: [40, 20] -> Maximin = 40. Col Maxs: [40, 40] -> Minimax = 40. Yes! Two saddle points exist at (A1, B1) and (A1, B2), both yielding v* = ₹40.",
    explanation: "Demonstrates alternate optimal pure strategies with identical game value.",
    hint: "Yes, multiple saddle points at (A1, B1) and (A1, B2) with v* = ₹40.",
    level: "expert",
    codeExample: "MultipleSaddles: [(1, 1), (1, 2)] with v_star = 40;"
  },
  {
    question: "In a 3x3 game, if Row Mins are [₹15k, ₹25k, ₹20k] and Col Maxs are [₹30k, ₹25k, ₹35k], what is the equilibrium outcome?",
    shortAnswer: "Maximin = ₹25,000 (Row 2); Minimax = ₹25,000 (Col 2). Pure saddle point at (A2, B2) with v* = ₹25,000.",
    explanation: "Maximin equals Minimax.",
    hint: "Saddle point at (A2, B2) with v* = ₹25,000.",
    level: "moderate",
    codeExample: "v_star = 25000; optimalProfile = ['A2', 'B2'];"
  },
  {
    question: "Suppose Debangshu in Barrackpore is analyzing a 2x3 bidding matrix: A = [[35, 45, 30], [25, 40, 20]]. Find Debangshu's optimal pure strategy and security floor.",
    shortAnswer: "Row Mins: [30, 20] -> Maximin = 30. Optimal Strategy: A1, guaranteeing a minimum security floor of ₹30,000.",
    explanation: "Row 1 strictly dominates Row 2 across all columns.",
    hint: "Strategy A1 with security floor ₹30,000.",
    level: "moderate",
    codeExample: "DebangshuStrategy = 'A1'; Floor = 30000;"
  },
  {
    question: "In a 2x2 game, if A = [[10, -10], [-10, 10]], what are the Row Minima and Column Maxima?",
    shortAnswer: "Row Mins: [-10, -10] -> Maximin = -10; Col Maxs: [10, 10] -> Minimax = 10.",
    explanation: "Classic symmetric non-strictly determined matching pennies game.",
    hint: "Row Mins = [-10, -10], Col Maxs = [10, 10].",
    level: "moderate",
    codeExample: "RowMins = [-10, -10]; ColMaxs = [10, 10];"
  },
  {
    question: "Why does the game A = [[10, -10], [-10, 10]] have NO pure saddle point?",
    shortAnswer: "Because Maximin (-10) is strictly strictly less than Minimax (+10); the lower floor and upper ceiling do not coincide.",
    explanation: "Requires equal randomization (mixed strategy p = [0.5, 0.5]).",
    hint: "Because Maximin (-10) < Minimax (10).",
    level: "moderate",
    codeExample: "hasSaddle = (-10 === 10); // false"
  },
  {
    question: "Solve the 3x3 game: A = [[12, -8, -2], [6, 7, 3], [-10, -6, 2]]. Find the saddle point.",
    shortAnswer: "Row Mins: [-8, 3, -10] -> Maximin = 3 (Row 2). Col Maxs: [12, 7, 3] -> Minimax = 3 (Col 3). Saddle point at (A2, B3) with v* = ₹3.",
    explanation: "Cell (2, 3) = 3 is min in row 2 and max in col 3.",
    hint: "Saddle at (A2, B3) with v* = ₹3.",
    level: "moderate",
    codeExample: "Saddle: (2, 3) with value 3."
  },
  {
    question: "What is the computational complexity of finding a saddle point in an m x n matrix?",
    shortAnswer: "O(m * n) time complexity, requiring one complete scan to compute row minima and column maxima.",
    explanation: "Linear in the number of matrix entries.",
    hint: "O(m * n) linear time.",
    level: "intermediate",
    codeExample: "TimeComplexity = 'O(m * n)';"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating numerical matrix solutions, cell payoffs, and game values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of the Numerical Game = ₹25,000'"
  },
  {
    question: "What is the ultimate golden rule of Numerical Solutions for Pure Strategy & Saddle Point?",
    shortAnswer: "'Solve numerical matrix games systematically: calculate Row Minima horizontally, Column Maxima vertically, extract Maximin and Minimax; if equal, announce the saddle point (A_i*, B_j*) and game value v* in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all numerical resolution steps.",
    hint: "Row minima -> Col maxima -> Compare Maximin and Minimax -> Announce saddle point and v* in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ComputeRowMins() -> ComputeColMaxs() -> MatchMaximinMinimax(₹)."
  }
];

export default questions;
