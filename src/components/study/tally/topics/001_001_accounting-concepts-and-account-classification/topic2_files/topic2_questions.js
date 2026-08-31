export default [
  {
    id: 1,
    question: "According to the Business Entity Concept, how is the owner of a sole proprietorship treated in accounting records?",
    options: [
      "The owner and the business are treated as a single legal and accounting entity",
      "The business is treated as a separate distinct accounting entity from its owner",
      "The owner's personal house is included as a business asset",
      "The owner's personal grocery bills are debited to business expenses"
    ],
    answer: "The business is treated as a separate distinct accounting entity from its owner",
    explanation: "The Business Entity Concept states that for accounting purposes, a business is distinct from its owner. Capital introduced by the owner is treated as a liability of the business to the owner."
  },
  {
    id: 2,
    question: "Why is the owner's capital shown on the Liability side of a firm's Balance Sheet?",
    options: [
      "Because the business owes capital back to the owner under the Business Entity Concept",
      "Because capital is a bank loan",
      "Because capital is an operating expense",
      "Because capital decreases total assets"
    ],
    answer: "Because the business owes capital back to the owner under the Business Entity Concept",
    explanation: "Under the entity concept, the business receives funds from the proprietor as equity capital, making the business accountable/liable to repay that capital to the owner."
  },
  {
    id: 3,
    question: "Which accounting concept assumes that a business enterprise will continue operating for an foreseeable long period without intent or need to liquidate?",
    options: [
      "Money Measurement Concept",
      "Going Concern Concept",
      "Accrual Concept",
      "Matching Concept"
    ],
    answer: "Going Concern Concept",
    explanation: "The Going Concern Concept assumes the entity will continue operational existence into the foreseeable future, justifying historical cost valuation of fixed assets rather than net liquidation value."
  },
  {
    id: 4,
    question: "Why are fixed assets (like Plant & Machinery) recorded at historical cost less accumulated depreciation rather than current market liquidation value?",
    options: [
      "Because of the Going Concern Concept",
      "Because of the Money Measurement Concept",
      "Because of the Dual Aspect Concept",
      "Because of the Realization Concept"
    ],
    answer: "Because of the Going Concern Concept",
    explanation: "Since the firm is assumed to be a going concern (not closing down tomorrow), assets are held for earning revenue over their useful life rather than immediate resale, making liquidation prices irrelevant."
  },
  {
    id: 5,
    question: "According to the Money Measurement Concept, which of the following events CANNOT be recorded in the accounting books?",
    options: [
      "Purchase of raw materials for ₹50,000 cash",
      "Payment of monthly staff salaries of ₹1,20,000",
      "Resignation of a highly skilled General Manager",
      "Payment of factory rent of ₹35,000"
    ],
    answer: "Resignation of a highly skilled General Manager",
    explanation: "The Money Measurement Concept dictates that only events capable of being expressed objectively in monetary terms are recorded in accounting books. Employee skills, morale, or management quality cannot be quantified in money."
  },
  {
    id: 6,
    question: "What is the standard Accounting Period mandated by Indian tax authorities for financial accounting and GST reporting?",
    options: [
      "1st January to 31st December",
      "1st April to 31st March of the following calendar year",
      "1st July to 30th June",
      "1st November to 31st October"
    ],
    answer: "1st April to 31st March of the following calendar year",
    explanation: "In India, the financial year (FY) runs from 1st April to 31st March, establishing the statutory accounting period for Income Tax and GST compliance."
  },
  {
    id: 7,
    question: "Why is the continuous life of a business divided into specified Accounting Periods (such as annual financial years)?",
    options: [
      "To measure performance (Profit/Loss) and financial position periodically for tax and management review",
      "To force the business to re-register its trade license every year",
      "To erase ledger balances to zero every month",
      "To change company owners annually"
    ],
    answer: "To measure performance (Profit/Loss) and financial position periodically for tax and management review",
    explanation: "Stakeholders cannot wait until a company liquidates to evaluate performance; dividing business life into regular periods enables periodic P&L and Balance Sheet measurement."
  },
  {
    id: 8,
    question: "When the business owner withdraws ₹10,000 cash from the business bank account for personal household use, which account is debited?",
    options: [
      "General Expenses Account",
      "Drawings Account",
      "Capital Account directly",
      "Bank Account"
    ],
    answer: "Drawings Account",
    explanation: "Personal withdrawals by the owner are recorded in the Drawings Account (which reduces owner's capital equity) strictly separating personal expenses from business operations."
  },
  {
    id: 9,
    question: "Which accounting concept forms the foundation for recognizing Outstanding Expenses and Prepaid Income at the end of a financial period?",
    options: [
      "Accrual / Accounting Period Concept",
      "Money Measurement Concept",
      "Full Disclosure Concept",
      "Historical Cost Concept"
    ],
    answer: "Accrual / Accounting Period Concept",
    explanation: "The Accounting Period and Accrual concepts mandate that all revenues earned and expenses incurred during the current period must be recognized regardless of actual cash flow timing."
  },
  {
    id: 10,
    question: "If a company receives a major trade order worth ₹10,00,000 but no goods are shipped and no cash is exchanged yet, when is revenue recorded under the Realization Concept?",
    options: [
      "Immediately when the order email is received",
      "When the goods are delivered and legal ownership/invoice is passed to the buyer",
      "When the order contract is signed",
      "At the end of the calendar year regardless of delivery"
    ],
    answer: "When the goods are delivered and legal ownership/invoice is passed to the buyer",
    explanation: "Under the Realization / Revenue Recognition concept, revenue is recognized only when earned—i.e., when ownership of goods is transferred and legal claim to payment is established."
  },
  {
    id: 11,
    question: "How does TallyPrime enforce the Accounting Period concept during company creation?",
    options: [
      "By setting 'Financial Year Beginning From' (e.g. 1-Apr-2026) and 'Books Beginning From' fields",
      "By locking voucher entry to 24 hours only",
      "By requiring daily password updates",
      "By forcing users to close companies every weekend"
    ],
    answer: "By setting 'Financial Year Beginning From' (e.g. 1-Apr-2026) and 'Books Beginning From' fields",
    explanation: "During Company Creation (F3 > Create Company), TallyPrime asks for the Financial Year Start date, defining the statutory period for ledger reports and closing balances."
  },
  {
    id: 12,
    question: "Which accounting convention requires that accountants exercise caution and record all prospective losses while ignoring prospective gains?",
    options: [
      "Prudence / Conservatism Concept",
      "Consistency Concept",
      "Materiality Concept",
      "Dual Aspect Concept"
    ],
    answer: "Prudence / Conservatism Concept",
    explanation: "The Prudence (Conservatism) concept ensures financial statements are not overly optimistic: anticipate and provide for all possible losses (e.g. Provision for Bad Debts), but do not anticipate unearned gains."
  },
  {
    id: 13,
    question: "Valuing closing stock at 'Cost Price or Net Realizable Value (Market Price), whichever is lower' is an application of which concept?",
    options: [
      "Prudence / Conservatism Concept",
      "Going Concern Concept",
      "Business Entity Concept",
      "Matching Concept"
    ],
    answer: "Prudence / Conservatism Concept",
    explanation: "Valuing stock at the lower of cost or market value prevents overstating inventory assets and current period profits under the prudence principle."
  },
  {
    id: 14,
    question: "What is the primary drawback of the Money Measurement Concept in times of high inflation?",
    options: [
      "It fails to reflect changes in the purchasing power of money over time (historical rupees are treated as uniform)",
      "It requires extra tax payments",
      "It cannot record bank transactions",
      "It prevents the creation of ledger groups"
    ],
    answer: "It fails to reflect changes in the purchasing power of money over time (historical rupees are treated as uniform)",
    explanation: "Money measurement treats currency as a constant unit of value, ignoring inflationary distortion when comparing historical asset costs with current purchasing power."
  },
  {
    id: 15,
    question: "Which concept ensures that accounting methods and practices (e.g. straight-line vs written-down value depreciation) remain uniform year after year?",
    options: [
      "Consistency Concept",
      "Materiality Concept",
      "Entity Concept",
      "Money Measurement Concept"
    ],
    answer: "Consistency Concept",
    explanation: "The Consistency principle requires an entity to apply the same accounting policies consistently across financial periods so operational results can be meaningfully compared over time."
  },
  {
    id: 16,
    question: "According to the Dual Aspect Concept, every transaction recorded in the Journal must have:",
    options: [
      "At least one Debit aspect and at least one Credit aspect of equal monetary value",
      "Two Debit aspects only",
      "Two Credit aspects only",
      "Only a single cash aspect"
    ],
    answer: "At least one Debit aspect and at least one Credit aspect of equal monetary value",
    explanation: "The Dual Aspect principle is the core invariant of double-entry bookkeeping: every financial event impacts at least two accounts such that Total Debits = Total Credits."
  },
  {
    id: 17,
    question: "What does the Materiality Concept state regarding financial reporting?",
    options: [
      "Only items of significant financial materiality that influence user decisions need detailed disclosure; insignificant items can be merged or simplified",
      "Every pencil and paperclip must be tracked as a separate fixed asset",
      "Material items should be kept secret from tax authorities",
      "All physical materials in a factory must be sold immediately"
    ],
    answer: "Only items of significant financial materiality that influence user decisions need detailed disclosure; insignificant items can be merged or simplified",
    explanation: "Materiality permits accountants to expense small, minor items (e.g. buying a ₹50 stapler) as stationery expenses immediately rather than capitalizing them as long-term fixed assets."
  },
  {
    id: 18,
    question: "How does the Historical Cost Concept dictate asset valuation on the Balance Sheet?",
    options: [
      "Assets are recorded at their original purchase acquisition price paid, not current estimated replacement market price",
      "Assets are re-valued every morning based on stock market indices",
      "Assets are valued at zero after 1 month",
      "Assets are recorded at future expected sale price"
    ],
    answer: "Assets are recorded at their original purchase acquisition price paid, not current estimated replacement market price",
    explanation: "Historical Cost provides an objective, verifiable basis grounded in actual past transaction vouchers rather than subjective market estimates."
  },
  {
    id: 19,
    question: "Under the Accrual Concept, when should electricity expenses consumed in March 2026 (for which bill is paid in April 2026) be recorded?",
    options: [
      "In March 2026 (the period in which electricity was consumed)",
      "In April 2026 (when cash was paid)",
      "In May 2026",
      "It should never be recorded"
    ],
    answer: "In March 2026 (the period in which electricity was consumed)",
    explanation: "Accrual accounting recognizes expenses when incurred (consumed), regardless of when cash settlement occurs, matching expense to the financial year FY 2025-26."
  },
  {
    id: 20,
    question: "In TallyPrime, how does changing the current period via Alt+F2 affect accounting visibility?",
    options: [
      "It allows the user to view and record reports for any selected financial range (e.g. 01-Apr-2025 to 31-Mar-2026)",
      "It permanently deletes all entries outside the selected period",
      "It changes the GST tax percentage automatically",
      "It locks the computer keyboard"
    ],
    answer: "It allows the user to view and record reports for any selected financial range (e.g. 01-Apr-2025 to 31-Mar-2026)",
    explanation: "Pressing Alt+F2 (Change Period) in TallyPrime sets the active reporting date boundary for financial statements and daybooks."
  },
  {
    id: 21,
    question: "Which accounting concept prohibits arbitrary manipulation of financial profits by altering inventory valuation methods midway through a year?",
    options: [
      "Consistency Concept",
      "Money Measurement Concept",
      "Entity Concept",
      "Dual Aspect Concept"
    ],
    answer: "Consistency Concept",
    explanation: "Consistency prevents management from arbitrarily changing accounting policies to manipulate reported net profit between periods."
  },
  {
    id: 22,
    question: "What is the impact of violating the Business Entity Concept by paying personal home rent from business cash without recording it as Drawings?",
    options: [
      "Business operating expenses will be falsely inflated, understating true business profitability",
      "Business operating profits will increase",
      "Total assets will double",
      "No impact on financial accuracy"
    ],
    answer: "Business operating expenses will be falsely inflated, understating true business profitability",
    explanation: "Charging personal owner expenses to business expense accounts distorts true business profitability and violates tax laws."
  },
  {
    id: 23,
    question: "Under the Matching Concept, why must Closing Stock be deducted from Total Purchases/Cost of Goods Available when calculating Gross Profit?",
    options: [
      "To match only the cost of goods actually sold during the period against the sales revenue generated in that same period",
      "To pay higher income tax",
      "To reduce bank loan eligibility",
      "To increase cash in hand"
    ],
    answer: "To match only the cost of goods actually sold during the period against the sales revenue generated in that same period",
    explanation: "Unsold inventory belongs to future periods; deducting closing stock ensures current revenue is matched strictly against the Cost of Goods Sold (COGS)."
  },
  {
    id: 24,
    question: "Which accounting principle demands full reporting of all significant financial information, notes, and contingent liabilities in financial statements?",
    options: [
      "Full Disclosure Concept",
      "Money Measurement Concept",
      "Going Concern Concept",
      "Historical Cost Concept"
    ],
    answer: "Full Disclosure Concept",
    explanation: "Full Disclosure requires that financial reports present all relevant financial facts, accounting policies, and contingent liabilities so investors/auditors get a complete picture."
  },
  {
    id: 25,
    question: "Why must a commercial accountant understand all fundamental accounting concepts before configuring TallyPrime?",
    options: [
      "Because software parameters (F11/F12, Grouping, Accrual vs Cash basis) must align perfectly with GAAP and statutory accounting standards",
      "Because TallyPrime automatically changes accounting concepts every month",
      "Because accounting concepts are required to type customer names",
      "Because computers cannot process numbers without concepts"
    ],
    answer: "Because software parameters (F11/F12, Grouping, Accrual vs Cash basis) must align perfectly with GAAP and statutory accounting standards",
    explanation: "TallyPrime executes double-entry math automatically, but selecting correct ledger groups, accrual options, and tax configurations requires deep conceptual understanding."
  }
];
