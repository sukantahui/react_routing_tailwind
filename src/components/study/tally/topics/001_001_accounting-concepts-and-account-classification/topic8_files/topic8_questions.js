export default [
  {
    id: 1,
    question: "Under the modern system of accounting, into which 5 major categories are all business accounts classified?",
    options: [
      "Assets, Liabilities, Capital / Equity, Expenses, and Revenues / Incomes",
      "Personal, Real, Nominal, Cash, and Bank",
      "Direct, Indirect, Trading, P&L, and Balance Sheet",
      "Fixed, Current, Tangible, Intangible, and Fictitious"
    ],
    answer: "Assets, Liabilities, Capital / Equity, Expenses, and Revenues / Incomes",
    explanation: "Modern accounting simplifies double-entry bookkeeping by grouping all accounts into 5 primary heads: Assets, Liabilities, Capital, Expenses, and Incomes."
  },
  {
    id: 2,
    question: "Under modern debit-credit rules, what is the rule for an Asset Account?",
    options: [
      "Increase is Debited (+), Decrease is Credited (-)",
      "Increase is Credited (+), Decrease is Debited (-)",
      "Always Debited regardless of change",
      "Always Credited regardless of change"
    ],
    answer: "Increase is Debited (+), Decrease is Credited (-)",
    explanation: "Asset accounts carry a normal debit balance; increases in asset values are debited and decreases are credited."
  },
  {
    id: 3,
    question: "Under modern debit-credit rules, what is the rule for an Expense Account?",
    options: [
      "Increase is Debited (+), Decrease is Credited (-)",
      "Increase is Credited (+), Decrease is Debited (-)",
      "Always Credited",
      "No rule applies"
    ],
    answer: "Increase is Debited (+), Decrease is Credited (-)",
    explanation: "Expense accounts share the same behavior as Assets: increases are debited and reductions/reversals are credited."
  },
  {
    id: 4,
    question: "Under modern debit-credit rules, what is the rule for a Liability Account?",
    options: [
      "Increase is Credited (+), Decrease is Debited (-)",
      "Increase is Debited (+), Decrease is Credited (-)",
      "Always Debited",
      "Always zero"
    ],
    answer: "Increase is Credited (+), Decrease is Credited (-)",
    explanation: "Liability accounts carry a normal credit balance; increases in debts are credited and repayments/decreases are debited."
  },
  {
    id: 5,
    question: "Under modern debit-credit rules, what is the rule for Capital / Equity Account?",
    options: [
      "Increase is Credited (+), Decrease is Debited (-)",
      "Increase is Debited (+), Decrease is Credited (-)",
      "Always Debited",
      "No balance maintained"
    ],
    answer: "Increase is Credited (+), Decrease is Debited (-)",
    explanation: "Capital/Equity accounts represent claims owned by proprietors; increases (capital addition, profit) are credited and decreases (drawings, loss) are debited."
  },
  {
    id: 6,
    question: "Under modern debit-credit rules, what is the rule for a Revenue / Income Account?",
    options: [
      "Increase is Credited (+), Decrease is Debited (-)",
      "Increase is Debited (+), Decrease is Credited (-)",
      "Always Debited",
      "Always zero"
    ],
    answer: "Increase is Credited (+), Decrease is Debited (-)",
    explanation: "Revenue/Income accounts carry a normal credit balance; increases in sales/turnover are credited and returns/discounts reduce revenue via debit."
  },
  {
    id: 7,
    question: "Which two modern account categories have normal DEBIT balances?",
    options: [
      "Assets and Expenses",
      "Liabilities and Capital",
      "Incomes and Capital",
      "Liabilities and Expenses"
    ],
    answer: "Assets and Expenses",
    explanation: "Assets and Expenses increase on the Debit side and carry normal Debit balances (mnemonic: DEAD - Debit Expenses And Assets)."
  },
  {
    id: 8,
    question: "Which three modern account categories have normal CREDIT balances?",
    options: [
      "Liabilities, Capital, and Revenues / Incomes",
      "Assets, Expenses, and Capital",
      "Assets, Liabilities, and Expenses",
      "Incomes, Expenses, and Assets"
    ],
    answer: "Liabilities, Capital, and Revenues / Incomes",
    explanation: "Liabilities, Capital, and Incomes increase on the Credit side and carry normal Credit balances (mnemonic: CLEAR - Credit Liabilities Equity And Revenue)."
  },
  {
    id: 9,
    question: "When a firm purchases office laptops for ₹1,20,000 cash, how is modern classification applied?",
    options: [
      "Office Equipment Asset increases (+Debit ₹1,20,000); Cash Asset decreases (-Credit ₹1,20,000)",
      "Expenses increase (+Debit); Cash increases (+Credit)",
      "Capital increases (+Credit); Asset decreases (-Debit)",
      "Liabilities increase (+Credit); Cash decreases (-Debit)"
    ],
    answer: "Office Equipment Asset increases (+Debit ₹1,20,000); Cash Asset decreases (-Credit ₹1,20,000)",
    explanation: "Office Equipment asset increases (Debit Laptop A/c) and Cash asset decreases (Credit Cash A/c)."
  },
  {
    id: 10,
    question: "When a firm borrows ₹4,00,000 from Axis Bank, how is modern classification applied?",
    options: [
      "Bank Asset increases (+Debit ₹4,00,000); Bank Loan Liability increases (+Credit ₹4,00,000)",
      "Bank Asset increases (+Debit); Capital increases (+Credit)",
      "Expenses increase (+Debit); Bank increases (+Credit)",
      "Bank Asset decreases (-Debit); Liability decreases (-Credit)"
    ],
    answer: "Bank Asset increases (+Debit ₹4,00,000); Bank Loan Liability increases (+Credit ₹4,00,000)",
    explanation: "Liquid Bank asset increases (Debit Bank) and Bank Loan liability increases (Credit Axis Bank Loan A/c)."
  },
  {
    id: 11,
    question: "When electricity bill of ₹8,000 is paid in cash, how is modern classification applied?",
    options: [
      "Electricity Expense increases (+Debit ₹8,000); Cash Asset decreases (-Credit ₹8,000)",
      "Cash Asset increases (+Debit); Expense decreases (-Credit)",
      "Liability increases (+Credit); Capital increases (+Credit)",
      "Capital decreases (-Debit); Stock increases (+Credit)"
    ],
    answer: "Electricity Expense increases (+Debit ₹8,000); Cash Asset decreases (-Credit ₹8,000)",
    explanation: "Electricity expense increases (Debit Electricity Expense) and Cash asset decreases (Credit Cash)."
  },
  {
    id: 12,
    question: "When customer Rahul pays ₹25,000 cash to settle an outstanding invoice, how is modern classification applied?",
    options: [
      "Cash Asset increases (+Debit ₹25,000); Debtor Asset (Rahul) decreases (-Credit ₹25,000)",
      "Revenue increases (+Credit); Cash decreases (-Debit)",
      "Liability decreases (-Debit); Asset decreases (-Credit)",
      "Capital increases (+Credit); Cash increases (+Debit)"
    ],
    answer: "Cash Asset increases (+Debit ₹25,000); Debtor Asset (Rahul) decreases (-Credit ₹25,000)",
    explanation: "Cash asset increases (Debit Cash) while Debtor trade asset decreases (Credit Rahul A/c)."
  },
  {
    id: 13,
    question: "In TallyPrime, how does the 28 pre-defined primary and sub-group structure map to the 5 modern accounting categories?",
    options: [
      "Primary groups like Current Assets/Fixed Assets map to Assets; Current Liabilities/Loans map to Liabilities; Capital A/c to Equity; Sales/Indirect Income to Revenue; Purchase/Indirect Expense to Expenses",
      "TallyPrime does not use modern classification",
      "All 28 groups map to Cash only",
      "Users must map groups manually every day"
    ],
    answer: "Primary groups like Current Assets/Fixed Assets map to Assets; Current Liabilities/Loans map to Liabilities; Capital A/c to Equity; Sales/Indirect Income to Revenue; Purchase/Indirect Expense to Expenses",
    explanation: "TallyPrime's Chart of Accounts architecture is built upon modern account classification."
  },
  {
    id: 14,
    question: "What is the modern classification of 'Unearned Revenue' / 'Advance received from Customers'?",
    options: [
      "Liability (Current Liability)",
      "Revenue / Income",
      "Asset",
      "Capital / Equity"
    ],
    answer: "Liability (Current Liability)",
    explanation: "Advance received before delivering goods/services creates an obligation to deliver or refund, making it a Liability."
  },
  {
    id: 15,
    question: "What is the modern classification of 'Accrued Income' / 'Income Earned but not Received'?",
    options: [
      "Asset (Current Asset)",
      "Liability",
      "Expense",
      "Capital"
    ],
    answer: "Asset (Current Asset)",
    explanation: "Income earned for which payment is due creates a receivable asset (Accrued Income Asset)."
  },
  {
    id: 16,
    question: "When a firm repays ₹50,000 towards an existing bank loan, what is the modern debit-credit action?",
    options: [
      "Debit Bank Loan A/c (Liability decreases -Debit); Credit Bank A/c (Asset decreases -Credit)",
      "Credit Bank Loan A/c; Debit Bank A/c",
      "Debit Expense A/c; Credit Asset A/c",
      "Credit Capital A/c; Debit Asset A/c"
    ],
    answer: "Debit Bank Loan A/c (Liability decreases -Debit); Credit Bank A/c (Asset decreases -Credit)",
    explanation: "Repaying debt reduces liability (Debit Bank Loan) and reduces bank asset (Credit Bank)."
  },
  {
    id: 17,
    question: "When owner withdraws ₹12,000 cash for personal use, how does modern classification treat Drawings?",
    options: [
      "Drawings acts as a contra-equity account: Debit Drawings (+Debit reduces Capital Equity); Credit Cash (-Credit Asset)",
      "Debit Cash; Credit Capital",
      "Debit Expense; Credit Liability",
      "Credit Revenue; Debit Asset"
    ],
    answer: "Drawings acts as a contra-equity account: Debit Drawings (+Debit reduces Capital Equity); Credit Cash (-Credit Asset)",
    explanation: "Drawings is a contra-capital account that reduces owner's equity on the Balance Sheet."
  },
  {
    id: 18,
    question: "If a business receives ₹15,000 cash refund from a supplier due to overpayment, what is the modern entry?",
    options: [
      "Cash Asset increases (+Debit ₹15,000); Sundry Creditor Liability / Purchase Expense decreases (-Credit ₹15,000)",
      "Revenue increases (+Credit); Cash decreases (-Debit)",
      "Capital increases (+Credit); Expense increases (+Debit)",
      "Liability increases (+Credit); Cash increases (+Debit)"
    ],
    answer: "Cash Asset increases (+Debit ₹15,000); Sundry Creditor Liability / Purchase Expense decreases (-Credit ₹15,000)",
    explanation: "Receiving refund increases Cash asset (Debit Cash) and reduces vendor liability/expense (Credit Creditor/Purchase)."
  },
  {
    id: 19,
    question: "Why do accountants favor Modern Account Classification over Traditional Rules for computer accounting software like TallyPrime?",
    options: [
      "Because the 5-category increase/decrease rules directly align with financial statement equation math (Balance Sheet & P&L) and digital ledger grouping",
      "Because traditional rules are illegal",
      "Because modern rules do not require math",
      "Because modern rules eliminate taxes"
    ],
    answer: "Because the 5-category increase/decrease rules directly align with financial statement equation math (Balance Sheet & P&L) and digital ledger grouping",
    explanation: "The 5 modern categories map directly into digital database schemas and automated financial statement algorithms."
  },
  {
    id: 20,
    question: "What is the modern classification of 'Provision for Depreciation'?",
    options: [
      "Contra-Asset Account (deducted from Fixed Assets on Balance Sheet)",
      "Revenue Income",
      "Current Liability",
      "Capital Equity"
    ],
    answer: "Contra-Asset Account (deducted from Fixed Assets on Balance Sheet)",
    explanation: "Provision for Depreciation is a contra-asset account offsetting gross asset cost."
  },
  {
    id: 21,
    question: "When a firm pays ₹30,000 for annual building insurance premium covering next 12 months, how is it categorized on day 1?",
    options: [
      "Prepaid Insurance Asset increases (+Debit ₹30,000); Cash Asset decreases (-Credit ₹30,000)",
      "Insurance Expense increases (+Debit); Cash decreases (-Credit)",
      "Capital decreases (-Debit); Cash increases (+Credit)",
      "Liability increases (+Credit); Cash decreases (-Credit)"
    ],
    answer: "Prepaid Insurance Asset increases (+Debit ₹30,000); Cash Asset decreases (-Credit ₹30,000)",
    explanation: "Advance insurance is a prepaid current asset until the time period elapses."
  },
  {
    id: 22,
    question: "What is the effect on the 5 modern categories when goods costing ₹40,000 are sold on credit for ₹55,000?",
    options: [
      "Debtor Asset increases +₹55,000; Revenue Income increases +₹55,000; Stock Asset decreases -₹40,000; Expense (COGS) increases +₹40,000",
      "Debtor increases +₹55,000; Stock increases +₹40,000",
      "Capital decreases -₹15,000",
      "Liabilities increase +₹55,000"
    ],
    answer: "Debtor Asset increases +₹55,000; Revenue Income increases +₹55,000; Stock Asset decreases -₹40,000; Expense (COGS) increases +₹40,000",
    explanation: "Sales revenue +₹55k and debtor asset +₹55k; stock asset -₹40k and COGS expense +₹40k (yielding net +₹15k profit to equity)."
  },
  {
    id: 23,
    question: "Which of the following is classified as an Expense under modern classification?",
    options: [
      "Carriage Outward / Freight on Sales",
      "Sundry Debtors",
      "Bank Overdraft",
      "Share Capital"
    ],
    answer: "Carriage Outward / Freight on Sales",
    explanation: "Carriage Outward is a selling distribution expense debited to Profit & Loss."
  },
  {
    id: 24,
    question: "Which of the following is classified as a Revenue / Income under modern classification?",
    options: [
      "Discount Received from Creditors",
      "Prepaid Expense",
      "Outstanding Salary",
      "Machinery Purchase"
    ],
    answer: "Discount Received from Creditors",
    explanation: "Discount Received represents financial revenue income credited to P&L."
  },
  {
    id: 25,
    question: "Summary of Modern Rules: To increase an Asset or Expense you _____; to increase a Liability, Capital, or Revenue you _____.",
    options: [
      "DEBIT; CREDIT",
      "CREDIT; DEBIT",
      "DEBIT; DEBIT",
      "CREDIT; CREDIT"
    ],
    answer: "DEBIT; CREDIT",
    explanation: "Assets & Expenses increase on DEBIT; Liabilities, Capital & Revenue increase on CREDIT."
  }
];
