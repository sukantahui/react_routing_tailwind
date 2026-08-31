export default [
  {
    "id": 1,
    "question": "How often are Subsidiary Book monthly totals posted to General Ledger Control Accounts?",
    "options": [
      "At the end of every month / accounting period",
      "Every hour",
      "Never",
      "Only during tax audit"
    ],
    "answer": "At the end of every month / accounting period",
    "explanation": "Periodic totals of Purchase Book, Sales Book, and Return Books are posted to main General Ledger control accounts at month end."
  },
  {
    "id": 2,
    "question": "If Purchase Book total for April is 1,50,000, what is the posting to Purchases Ledger Account?",
    "options": [
      "Debit Purchases Account with 1,50,000 as \"To Sundries as per Purchase Book\"",
      "Credit Purchases Account",
      "No posting",
      "Debit Cash Account"
    ],
    "answer": "Debit Purchases Account with 1,50,000 as \"To Sundries as per Purchase Book\"",
    "explanation": "Total credit purchases are debited to Purchases Account at month-end as \"To Sundries as per Purchase Book\"."
  },
  {
    "id": 3,
    "question": "If Sales Book total for May is ₹3,80,000, what is the posting to Sales Ledger Account?",
    "options": [
      "Credit Sales Account with ₹3,80,000 as \"By Sundries as per Sales Book\"",
      "Debit Sales Account",
      "No posting",
      "Debit Cash Account"
    ],
    "answer": "Credit Sales Account with ₹3,80,000 as \"By Sundries as per Sales Book\"",
    "explanation": "Total credit sales are credited to Sales Account at month-end as \"By Sundries as per Sales Book\"."
  },
  {
    "id": 4,
    "question": "How often are individual party entries in Subsidiary Books posted to personal ledgers?",
    "options": [
      "Daily on the date of transaction",
      "Once a year",
      "Only during audit",
      "Never"
    ],
    "answer": "Daily on the date of transaction",
    "explanation": "Individual party entries are posted daily to Debtor/Creditor ledgers to keep customer balances updated."
  },
  {
    "id": 5,
    "question": "In TallyPrime, which report verifies that total Debits equal total Credits for all ledgers?",
    "options": [
      "Trial Balance",
      "Stock Summary",
      "Day Book",
      "GSTR-3B"
    ],
    "answer": "Trial Balance",
    "explanation": "Trial Balance verifies the arithmetic equality of all debits and credits across general ledgers."
  }
];
