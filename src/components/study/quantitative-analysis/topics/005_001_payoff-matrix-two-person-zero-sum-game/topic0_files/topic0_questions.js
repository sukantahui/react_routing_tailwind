// topic0_questions.js
// 30 Moderate to Expert Questions on Introduction to Game Theory

const questions = [
  {
    question: "What is the formal definition of Game Theory in Operations Research and Economics?",
    shortAnswer: "A mathematical framework for analyzing strategic interactions among rational decision-making participants (players), where the outcome and payoff for each player depend on the interdependent choices made by all players.",
    explanation: "Game Theory studies conflict, cooperation, and strategic optimization.",
    hint: "Mathematical study of strategic interactions among rational decision-makers.",
    level: "moderate",
    codeExample: "Game = { Players: ['A', 'B'], Strategies: { A: ['S1', 'S2'], B: ['T1', 'T2'] }, Payoffs: [[3, -1], [-2, 4]] };"
  },
  {
    question: "Who were the foundational pioneers of modern Mathematical Game Theory?",
    shortAnswer: "John von Neumann and Oskar Morgenstern, who published the seminal book 'Theory of Games and Economic Behavior' in 1944, later extended by John Nash (1950) with the concept of Nash Equilibrium.",
    explanation: "Von Neumann proved the Minimax Theorem; Nash generalized non-cooperative equilibria.",
    hint: "John von Neumann and Oskar Morgenstern (1944); John Nash (1950).",
    level: "moderate",
    codeExample: "Founders: { 1944: 'von Neumann & Morgenstern', 1950: 'John Nash' };"
  },
  {
    question: "What are the 5 foundational elements that define any strategic game?",
    shortAnswer: "1. Players (decision-makers); 2. Strategy Sets (actions available to each player); 3. Information Structure (knowledge of past moves and payoffs); 4. Payoff Functions (utilities in ₹); 5. Rationality Assumption (each player maximizes their own expected payoff).",
    explanation: "These 5 components formally specify a game in strategic normal form.",
    hint: "Players, Strategies, Information, Payoffs, and Rationality.",
    level: "moderate",
    codeExample: "GameDefinition: G = (N, {S_i}, {u_i});"
  },
  {
    question: "What is the 'Rationality Assumption' in classical Game Theory?",
    shortAnswer: "The assumption that each player always seeks to maximize their own personal payoff (or minimize their worst-case loss), has well-defined preferences, and expects all other players to act with the same rational self-interest.",
    explanation: "Rationality assumes perfect computational capability and utility maximization.",
    hint: "Players act consistently to maximize their own payoff knowing opponents do the same.",
    level: "moderate",
    codeExample: "Rationality: Player.chooseStrategy = (s) => argmax(expectedUtility(s));"
  },
  {
    question: "What is a 'Zero-Sum Game'?",
    shortAnswer: "A game in which the sum of the payoffs to all players equals exactly zero for every possible combination of strategies; the gain of one player is mathematically identical to the loss of the opponent(s).",
    explanation: "Pure conflict game where no mutual gain is possible (Gain + Loss = 0).",
    hint: "Total gains equal total losses across all outcomes (Sum of payoffs = 0).",
    level: "moderate",
    codeExample: "isZeroSum = (outcomes) => outcomes.every(outcome => outcome.payoffA + outcome.payoffB === 0);"
  },
  {
    question: "How does a Zero-Sum Game differ from a Non-Zero-Sum Game?",
    shortAnswer: "In a zero-sum game, total wealth/payoff is strictly conserved (win-lose); in a non-zero-sum game, total payoff can increase (win-win / cooperation) or decrease (lose-lose / price war) depending on player coordination.",
    explanation: "Non-zero-sum games admit mutually beneficial cooperation (e.g. Prisoner's Dilemma, Trade).",
    hint: "Zero-sum is pure conflict; non-zero-sum allows win-win cooperation or mutual destruction.",
    level: "moderate",
    codeExample: "NonZeroSum: PayoffA + PayoffB != 0;"
  },
  {
    question: "What is the difference between Cooperative and Non-Cooperative Game Theory?",
    shortAnswer: "In Non-Cooperative games, players make independent decisions and cannot enforce binding commitments; in Cooperative games, players can form coalitions, negotiate agreements, and sign legally binding contracts.",
    explanation: "Most quantitative analysis courses focus on non-cooperative games.",
    hint: "Cooperative allows binding contracts; non-cooperative enforces independent self-interest.",
    level: "intermediate",
    codeExample: "Cooperative: BindingContracts === true; NonCooperative: BindingContracts === false;"
  },
  {
    question: "What is a 'Simultaneous Game' vs a 'Sequential (Dynamic) Game'?",
    shortAnswer: "In Simultaneous games, players choose their strategies at the same time without knowing the opponent's choice (represented by a Normal Form Matrix); in Sequential games, players take turns with full or partial visibility of prior moves (represented by an Extensive Form Game Tree).",
    explanation: "Normal form matrix vs Extensive form game tree.",
    hint: "Simultaneous = hidden simultaneous moves (Matrix); Sequential = turn-based (Game Tree).",
    level: "moderate",
    codeExample: "GameForms: NormalFormMatrix (Simultaneous) vs ExtensiveFormTree (Sequential)."
  },
  {
    question: "What is a 'Finite Game' in Game Theory?",
    shortAnswer: "A game where each player has a FINITE number of discrete strategies to choose from, and the game terminates after a finite number of moves or stages.",
    explanation: "Finite games can always be written as a finite m x n payoff matrix.",
    hint: "A game with a finite number of players and finite available strategies.",
    level: "moderate",
    codeExample: "isFiniteGame = (playerA.strategies.length < Infinity && playerB.strategies.length < Infinity);"
  },
  {
    question: "What is the difference between Perfect Information and Imperfect Information?",
    shortAnswer: "In Perfect Information games (like Chess), players know the exact history and all prior moves made by everyone; in Imperfect Information games (like Poker or simultaneous matrices), players do not know the opponent's simultaneous or hidden moves.",
    explanation: "Simultaneous payoff matrices are models of imperfect information.",
    hint: "Perfect = all past moves known; Imperfect = simultaneous or hidden moves exist.",
    level: "intermediate",
    codeExample: "InformationState: Perfect (Complete history visible) vs Imperfect (Simultaneous/hidden)."
  },
  {
    question: "What is the 'Normal Form' (or Strategic Form) representation of a game?",
    shortAnswer: "A compact matrix representation specifying: 1. The set of players; 2. The strategy sets available to each player (rows and columns); 3. The payoff matrix associating a numerical reward (in ₹) to each strategy profile.",
    explanation: "The standard matrix format used throughout quantitative operations research.",
    hint: "Matrix representation of players, row/column strategies, and payoff entries.",
    level: "moderate",
    codeExample: "NormalForm = { Rows: 'Player A', Cols: 'Player B', Matrix: [[a11, a12], [a21, a22]] };"
  },
  {
    question: "Suppose Debangshu in Barrackpore is competing against a rival foundry for a casting contract. If winning the contract yields ₹50,000 profit for Debangshu and causes a ₹50,000 loss in market share for the rival, what type of game is this?",
    shortAnswer: "A Two-Person Zero-Sum Game, because Player A Gain (+₹50,000) + Player B Loss (-₹50,000) = 0.",
    explanation: "Pure zero-sum competitive market bidding.",
    hint: "Two-person zero-sum game (net sum = 0).",
    level: "moderate",
    codeExample: "GameSum = (+50000) + (-50000) = 0;"
  },
  {
    question: "Why is Game Theory essential for legal scholars, business strategists, and operations managers in West Bengal?",
    shortAnswer: "Because it provides mathematical tools to anticipate competitor reactions, negotiate dispute settlements, optimize commercial pricing, formulate regulatory compliance, and prevent price wars in Indian Rupees (₹).",
    explanation: "Bridges quantitative mathematics with socio-legal and business strategy.",
    hint: "Anticipates competitor counter-moves and optimizes strategic decision-making.",
    level: "moderate",
    codeExample: "Applications: LegalDisputes, PricingStrategy, LaborNegotiation, PublicPolicy."
  },
  {
    question: "What currency symbol must ALWAYS be used when stating game payoffs, corporate profits, and dispute values in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Payoff to Player A = ₹75,000'"
  },
  {
    question: "What is the ultimate golden rule of the Introduction to Game Theory?",
    shortAnswer: "'Game Theory models interdependent strategic decisions between rational players; zero-sum games enforce Gain + Loss = 0; games are represented in Normal Form matrices with payoffs in Indian Rupees (₹); always anticipate the opponent's rational counter-strategy!'",
    explanation: "This complete rule captures all foundational principles of Game Theory.",
    hint: "Interdependent strategy -> Zero-sum conservation -> Normal form matrix in ₹ -> Anticipate rational opponents.",
    level: "moderate",
    codeExample: "GoldenRule: RationalPlayers() -> InterdependentPayoffs(₹) -> NormalForm() -> MinimaxOptimization()."
  }
];

export default questions;
