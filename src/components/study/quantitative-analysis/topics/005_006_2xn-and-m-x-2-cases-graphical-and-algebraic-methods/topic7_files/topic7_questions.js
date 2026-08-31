// topic7_questions.js
// 30 Moderate to Expert Questions on Determining the Value of the Game

const questions = [
  {
    question: "What is the closed-form determinant formula for the Value of the Game v* in an active 2x2 submatrix?",
    shortAnswer: "v* = (a11*a22 - a12*a21) / Δ, where Δ = (a11 + a22) - (a12 + a21).",
    explanation: "Standard closed-form 2x2 game value determinant formula.",
    hint: "v* = (a11*a22 - a12*a21) / Δ.",
    level: "moderate",
    codeExample: "v_star = (a11 * a22 - a12 * a21) / ((a11 + a22) - (a12 + a21));"
  },
  {
    question: "How can the Value of the Game v* be computed using expected payoffs?",
    shortAnswer: "v* = p*^T A q* = E(p*, Bj) for any active column Bj = E(Ai, q*) for any active row Ai.",
    explanation: "Inner product and expected payoff equivalences.",
    hint: "v* = p*^T A q* = E(p*, active Bj).",
    level: "moderate",
    codeExample: "v_star = p1 * a1j + (1 - p1) * a2j;"
  },
  {
    question: "What is the strategic definition of a 'Fair Game' in Game Theory?",
    shortAnswer: "A game is strictly fair if its equilibrium Game Value is exactly zero: v* = ₹0 (neither player has an expected financial advantage).",
    explanation: "Definition of fair zero-sum games.",
    hint: "v* = ₹0.",
    level: "moderate",
    codeExample: "isFair = (v_star === 0);"
  },
  {
    question: "What happens to the Value of the Game if a constant C = +₹10,000 is added to every cell in the payoff matrix?",
    shortAnswer: "The new Game Value increases by exactly C: v_new* = v_old* + ₹10,000. The optimal probability vectors p* and q* remain 100% UNCHANGED.",
    explanation: "Shift-invariance theorem of mixed strategy equilibria.",
    hint: "v* increases by C; p* and q* remain identical.",
    level: "expert",
    codeExample: "v_new = v_old + C; assert(p_new.every((val, i) => val === p_old[i]));"
  },
  {
    question: "What happens to the Value of the Game if every matrix cell is multiplied by a positive scalar k = 2?",
    shortAnswer: "The new Game Value doubles: v_new* = 2 * v_old*. The optimal probability vectors p* and q* remain 100% UNCHANGED.",
    explanation: "Scale-invariance theorem of mixed strategy equilibria.",
    hint: "v* scales by k; p* and q* remain identical.",
    level: "expert",
    codeExample: "v_new = k * v_old;"
  },
  {
    question: "Suppose an active 2x2 game has A_sub = [[20, 50], [40, 10]] (in ₹ Thousands). What is the exact Game Value v*?",
    shortAnswer: "v* = (20*10 - 50*40) / ((20+10) - (50+40)) = (200 - 2000) / (30 - 90) = -1800 / -60 = +₹30k (₹30,000).",
    explanation: "Step-by-step arithmetic calculation of v*.",
    hint: "v* = -1800 / -60 = ₹30,000.",
    level: "moderate",
    codeExample: "v_star = (200 - 2000) / -60; // 30000"
  },
  {
    question: "How does the Game Value v* guide risk-neutral corporate settlements and contract buyouts?",
    shortAnswer: "v* represents the exact expected mathematical valuation of the game; a risk-neutral company should accept any settlement offer >= v*, locking in expected profit without variance.",
    explanation: "Financial risk valuation role of v*.",
    hint: "Locks in guaranteed long-run average return with zero variance risk.",
    level: "moderate",
    codeExample: "shouldAcceptSettlement = (offerAmount >= v_star);"
  },
  {
    question: "Why is the Game Value invariant across all equivalent representations of the game (graphical, LP, algebraic)?",
    shortAnswer: "By the Minimax Theorem of von Neumann, every finite zero-sum game possesses a unique equilibrium Game Value v* regardless of the solution technique employed.",
    explanation: "Uniqueness of minimax game value theorem.",
    hint: "Von Neumann's Minimax Theorem guarantees a unique value v*.",
    level: "expert",
    codeExample: "assert(v_graphical === v_algebraic && v_algebraic === v_simplex);"
  },
  {
    question: "If a competitor in Kolkata agrees to pay Debangshu ₹30,000 per production cycle, is Debangshu achieving equilibrium?",
    shortAnswer: "YES! If v* = ₹30,000, receiving ₹30,000 per cycle achieves the exact theoretical Nash equilibrium payoff.",
    explanation: "Practical interpretation of cycle payments.",
    hint: "Yes, exactly equals the equilibrium game value.",
    level: "moderate",
    codeExample: "isEquilibrium = (payment === v_star);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating the Value of the Game in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Value of Game v* = ₹30,000'"
  },
  {
    question: "What is the ultimate golden rule of Determining the Value of the Game?",
    shortAnswer: "'Compute v* = (a11*a22 - a12*a21)/Δ or via inner product p*^T A q*; recognize shift-invariance under constant addition; interpret v* as guaranteed long-run cycle profit; and report the final value in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all Game Value determination mechanics.",
    hint: "Compute v* via determinant/inner product → Shift-invariance → Report in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: ComputeVStar() → VerifyShiftInvariance() → ReportInRupees(₹)."
  }
];

export default questions;
