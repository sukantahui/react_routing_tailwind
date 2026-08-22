// topic6_questions.js
// 30 Moderate to Expert Questions on Formulating Simple Game Matrices

const questions = [
  {
    question: "What are the 4 fundamental steps to formulate any Game Theory Payoff Matrix from a real-world problem statement?",
    shortAnswer: "1. Identify the two competing players (Player A and Player B); 2. Define the discrete, exhaustive strategy sets for each player; 3. Calculate the net payoff a_ij in Indian Rupees (₹) for every joint strategy pair from Player A's perspective; 4. Assemble the m x n matrix and compute Row Minima and Column Maxima.",
    explanation: "Standard 4-step formulation pipeline in Operations Research.",
    hint: "Identify players -> Define strategies -> Compute net payoffs in ₹ -> Assemble m x n matrix.",
    level: "moderate",
    codeExample: "FormulateGame = { Step1: 'Players', Step2: 'Strategies', Step3: 'PayoffsInRupees', Step4: 'MatrixAssembly' };"
  },
  {
    question: "Why must strategy sets for each player be 'mutually exclusive and collectively exhaustive'?",
    shortAnswer: "Mutually exclusive ensures a player chooses exactly one strategy per round; collectively exhaustive ensures all possible actions available to the player are accounted for in the model.",
    explanation: "Prevents gaps or overlapping choices in strategic decision-making.",
    hint: "Mutually exclusive (choose exactly one) and collectively exhaustive (covers all possibilities).",
    level: "moderate",
    codeExample: "StrategyCondition: isMutuallyExclusive && isCollectivelyExhaustive;"
  },
  {
    question: "In a competitive advertising game between two firms in Kolkata, if Firm A uses Strategy A1 (Social Media) and Firm B uses Strategy B1 (Billboards), Firm A gains ₹30,000 from Firm B. What is the matrix entry a_11?",
    shortAnswer: "a_11 = +₹30,000.",
    explanation: "Direct gain of ₹30,000 from B to A.",
    hint: "+₹30,000.",
    level: "moderate",
    codeExample: "a_11 = +30000;"
  },
  {
    question: "In the same advertising game, if Firm A uses Strategy A2 (Print Media) and Firm B uses Strategy B1 (Billboards), Firm A loses ₹10,000 to Firm B. What is the matrix entry a_21?",
    shortAnswer: "a_21 = -₹10,000.",
    explanation: "Net loss of ₹10,000 by Firm A to Firm B.",
    hint: "-₹10,000.",
    level: "moderate",
    codeExample: "a_21 = -10000;"
  },
  {
    question: "How do you formulate a Sealed-Bid Tender game with 2 bidders (Debangshu vs Rival) in Barrackpore?",
    shortAnswer: "Strategies: High Bid (₹10 Lakh), Medium Bid (₹8 Lakh), Low Bid (₹6 Lakh). If Debangshu bids lower than Rival, Debangshu wins contract profit; if higher, Rival wins (Debangshu profit = 0); if equal, profit is split 50-50.",
    explanation: "Classic procurement tender formulation.",
    hint: "Lowest bid wins the contract profit; equal bids split the profit.",
    level: "expert",
    codeExample: "TenderPayoff: bidA < bidB ? profitA : (bidA > bidB ? 0 : profitA / 2);"
  },
  {
    question: "How do you handle fixed production or operational costs when formulating a payoff matrix?",
    shortAnswer: "Subtract the fixed costs from revenue for each outcome to compute the NET profit payoff for each cell: Net Payoff a_ij = Revenue(A_i, B_j) - Costs(A_i).",
    explanation: "Payoffs must reflect net economic value in Indian Rupees (₹).",
    hint: "Net Payoff = Gross Revenue - Costs.",
    level: "moderate",
    codeExample: "NetPayoff = GrossRevenue - OperationalCosts;"
  },
  {
    question: "Suppose Susmita in Ichapur is formulating a 2x2 retail price match game. What are the typical row and column strategies?",
    shortAnswer: "Row Strategies (Supermarket A): A1 = Maintain Regular Prices, A2 = 10% Discount Campaign; Column Strategies (Supermarket B): B1 = Maintain Regular Prices, B2 = 10% Discount Campaign.",
    explanation: "Symmetric price competition model.",
    hint: "Maintain regular price vs discount campaign for both players.",
    level: "moderate",
    codeExample: "Strategies: { A: ['Regular', 'Discount'], B: ['Regular', 'Discount'] };"
  },
  {
    question: "How is a legal settlement dispute between two parties in Jadavpur formulated as a game matrix?",
    shortAnswer: "Player A (Plaintiff) strategies: A1 = Settle Out of Court, A2 = Go to Trial; Player B (Defendant) strategies: B1 = Offer Settlement ₹50,000, B2 = Reject Settlement. Payoffs represent net damages awarded minus legal fees.",
    explanation: "Socio-legal operations research model.",
    hint: "Settle vs Trial with net damage payouts in ₹.",
    level: "expert",
    codeExample: "LegalGame: SettleVsTrial with legal fees deducted."
  },
  {
    question: "What is the recommended matrix format check after formulating a payoff matrix?",
    shortAnswer: "1. Dimensions are m x n; 2. All values are in identical units (e.g. ₹ Thousands); 3. Row Minima and Column Maxima are computed; 4. Maximin <= Minimax is verified.",
    explanation: "Standard validation checklist for formulated matrices.",
    hint: "Check dimensions, units, row mins, col maxes, and Maximin <= Minimax.",
    level: "moderate",
    codeExample: "validateFormulation: (m) => m.length > 0 && isNumeric(m) && maximin(m) <= minimax(m);"
  },
  {
    question: "What currency symbol must ALWAYS be used when formulating strategic game matrices, contract tenders, and commercial payoffs in West Bengal?",
    shortAnswer: "The Indian Rupee symbol (₹).",
    explanation: "Indian Rupee (₹) is the required standard.",
    hint: "Indian Rupee (₹).",
    level: "moderate",
    codeExample: "Report: 'Formulated Matrix in Indian Rupees (₹)'"
  },
  {
    question: "What is the ultimate golden rule of Formulating Game Matrices in Game Theory?",
    shortAnswer: "'Formulate games in 4 steps: identify players, define exhaustive strategies, compute net payoffs in Indian Rupees (₹) from Player A’s perspective, and assemble the m x n matrix; always verify Maximin <= Minimax to find equilibrium!'",
    explanation: "This complete rule captures all formulation principles.",
    hint: "Players -> Strategies -> Net payoffs in ₹ -> Assemble m x n matrix -> Verify Maximin <= Minimax.",
    level: "moderate",
    codeExample: "GoldenRule: IdentifyPlayers() -> DefineStrategies() -> CalculateNetPayoff(₹) -> AssembleMatrix() -> ValidateEquilibrium()."
  }
];

export default questions;
