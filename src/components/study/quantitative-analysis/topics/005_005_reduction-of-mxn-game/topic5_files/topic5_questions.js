// topic5_questions.js
// 30 Moderate to Expert Questions on Interpreting the Reduced Game

const questions = [
  {
    question: "What does the 'Support' of an optimal mixed strategy signify in managerial decision-making?",
    shortAnswer: "The Support represents the core active tactical options that an enterprise must deploy with positive probability, while strategies outside the support are operational dead-weight and should be defunded or eliminated.",
    explanation: "Managerial meaning of strategy support.",
    hint: "Active options that must receive budget; pruned options are defunded.",
    level: "moderate",
    codeExample: "BudgetAllocation: ActiveSupportStrategies.map(strat => allocateCapital(p_star[strat]));"
  },
  {
    question: "How should a manager interpret an equilibrium Value of the Game v* = +₹28,000 per production cycle?",
    shortAnswer: "It guarantees that under optimal randomized scheduling, the company will achieve a long-run average expected profit of ₹28,000 per cycle, regardless of the competitor's tactics.",
    explanation: "Financial interpretation of game value.",
    hint: "Guaranteed long-run expected profit of ₹28,000 per cycle.",
    level: "moderate",
    codeExample: "ExpectedProfitPerCycle = 28000;"
  },
  {
    question: "Why should an enterprise continue randomizing between two surviving strategies instead of committing 100% to the higher-payoff option?",
    shortAnswer: "Because pure commitment leaks information, allowing the rival to immediately pivot to a counter-strategy that minimizes the firm's payoff to the worst-case floor.",
    explanation: "Rationale for randomization and unpredictable behavior.",
    hint: "Deterministic commitment invites competitor counter-exploitation.",
    level: "intermediate",
    codeExample: "if (isDeterministic) rival.exploitWithCounterStrategy();"
  },
  {
    question: "What does it mean if an eliminated strategy has an expected return of ₹20,000 when v* = ₹28,000?",
    shortAnswer: "It proves that the eliminated strategy is strictly suboptimal for Player A, providing ₹8,000 less expected return than the equilibrium mix.",
    explanation: "Opportunity cost of playing non-support strategies.",
    hint: "Represents an opportunity loss of ₹8,000 per cycle.",
    level: "moderate",
    codeExample: "OpportunityLoss = v_star - eliminatedStrategyPayoff; // 8000"
  },
  {
    question: "What is 'Dominance Breakdown Sensitivity' in post-optimality analysis?",
    shortAnswer: "The threshold change in a matrix cell payoff that causes a previously dominated strategy to become non-dominated (or active), altering the support and equilibrium solution.",
    explanation: "Sensitivity analysis on payoff matrix entries.",
    hint: "Payoff perturbation threshold where dominance relations flip.",
    level: "expert",
    codeExample: "SensitivityDelta = findBreakdownThreshold(matrix, dominantPair);"
  },
  {
    question: "Suppose Debangshu in Barrackpore finds p* = [0.6, 0.0, 0.4, 0.0] for 4 furnace shifts in a month (30 days). How should he operationalize this?",
    shortAnswer: "Schedule Shift 1 for 18 days (60%), Shift 3 for 12 days (40%), and completely cancel Shifts 2 and 4 (0 days).",
    explanation: "Translating probabilities into operational day allocations.",
    hint: "18 days Shift 1, 12 days Shift 3, 0 days Shifts 2 & 4.",
    level: "moderate",
    codeExample: "shiftDays = [0.6 * 30, 0, 0.4 * 30, 0]; // [18, 0, 12, 0]"
  },
  {
    question: "If a competitor in Kolkata offers a settlement equal to the Game Value v* = ₹35,000, should Mamata and Mahima accept?",
    shortAnswer: "YES! Since ₹35,000 is the exact equilibrium expected valuation under optimal mixed play, accepting ₹35,000 locks in the full game value with ZERO variance risk.",
    explanation: "Risk-neutral settlement interpretation.",
    hint: "Yes, it locks in the theoretical optimum with zero variance.",
    level: "moderate",
    codeExample: "AcceptSettlement(v_star === 35000);"
  },
  {
    question: "How does matrix reduction provide strategic clarity to senior executive leadership?",
    shortAnswer: "It strips away dozens of irrelevant tactical variations, distilling the corporate dilemma into the core 2-strategy confrontation and preventing decision paralysis.",
    explanation: "Executive decision support value.",
    hint: "Eliminates distraction and distills the core 2-way strategic tension.",
    level: "intermediate",
    codeExample: "ExecutiveSummary: DistillCoreStrategicConfrontation(m_x_n => 2x2);"
  },
  {
    question: "What is the financial meaning of a Strictly Fair Reduced Game (v* = ₹0)?",
    shortAnswer: "The game represents a perfectly symmetric competitive standoff where neither competitor has a structural advantage under optimal play.",
    explanation: "Economic definition of fair game standoffs.",
    hint: "Neither player has an inherent advantage (expected transfer is ₹0).",
    level: "moderate",
    codeExample: "isFairStandoff = (v_star === 0);"
  },
  {
    question: "How do eliminated columns guide competitive intelligence regarding Player B's behavior?",
    shortAnswer: "They identify rival options that are so economically punishing for Player B that your analysts can confidently predict Player B will NEVER deploy them.",
    explanation: "Competitive intelligence and opponent profiling.",
    hint: "Eliminated columns represent rival moves that are economically unviable.",
    level: "expert",
    codeExample: "PredictOpponentWillNeverPlay(eliminatedCols);"
  },
  {
    question: "What currency symbol must ALWAYS be used when stating operational payoffs and valuations in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Monthly Expected Valuation = ₹35,000'"
  },
  {
    question: "What is the ultimate golden rule of Interpreting the Reduced Game?",
    shortAnswer: "'Translate optimal probabilities into tangible operational shift/resource allocations; defund pruned dead-weight options; interpret v* as the long-run guaranteed financial return; and state all budgets in Indian Rupees (₹)!'",
    explanation: "This complete rule captures all managerial interpretation mechanics.",
    hint: "Probabilities to resource allocations -> Defund dead-weight -> Guaranteed return in ₹.",
    level: "moderate",
    codeExample: "GoldenRule: AllocateResources(p_star) -> DefundDeadweight() -> BudgetGuaranteedReturn(₹)."
  }
];

export default questions;
