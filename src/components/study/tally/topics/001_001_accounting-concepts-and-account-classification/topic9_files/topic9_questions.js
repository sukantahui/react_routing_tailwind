export default [
  {
    id: 1,
    question: "What is the first step in the 4-step transaction analysis algorithm?",
    options: [
      "Pressing Ctrl+A in TallyPrime",
      "Identifying the two or more ledger accounts impacted by the source document",
      "Calculating tax interest penalties",
      "Printing the Balance Sheet"
    ],
    answer: "Identifying the two or more ledger accounts impacted by the source document",
    explanation: "Step 1 requires analyzing the source document (bill, cheque, receipt) to identify the specific accounts/ledgers affected by the commercial event."
  },
  {
    id: 2,
    question: "When analyzing 'Purchased machinery on credit from ABC Tech Ltd for ₹1,20,000', which two ledgers and voucher type are involved?",
    options: [
      "Machinery A/c and ABC Tech Ltd A/c | Voucher: F7 Journal",
      "Purchase A/c and Cash A/c | Voucher: F9 Purchase",
      "Machinery A/c and Cash A/c | Voucher: F5 Payment",
      "Sales A/c and Debtors A/c | Voucher: F8 Sales"
    ],
    answer: "Machinery A/c and ABC Tech Ltd A/c | Voucher: F7 Journal",
    explanation: "Buying a fixed asset on credit involves Machinery (Asset Dr) and ABC Tech Ltd (Creditor Cr). Since no cash is transferred and it is not trading stock, it is recorded in F7 Journal voucher."
  },
  {
    id: 3,
    question: "What voucher type is used in TallyPrime when transferring ₹50,000 cash from the office cash drawer into the SBI Bank current account?",
    options: [
      "F5 Payment",
      "F6 Receipt",
      "F4 Contra",
      "F7 Journal"
    ],
    answer: "F4 Contra",
    explanation: "Transactions involving only Cash and Bank internal transfers (without external third parties) are Contra entries recorded using F4 Contra."
  },
  {
    id: 4,
    question: "When analyzing 'Paid ₹8,000 to supplier Zenith Ltd by cheque in full settlement of a ₹8,500 invoice', which accounts and amounts are involved?",
    options: [
      "Debit Zenith Ltd ₹8,500 | Credit Bank ₹8,000 | Credit Discount Received ₹500",
      "Debit Zenith Ltd ₹8,000 | Credit Bank ₹8,000",
      "Debit Bank ₹8,500 | Credit Zenith Ltd ₹8,500",
      "Debit Discount ₹500 | Credit Cash ₹500"
    ],
    answer: "Debit Zenith Ltd ₹8,500 | Credit Bank ₹8,000 | Credit Discount Received ₹500",
    explanation: "Zenith's full liability of ₹8,500 is eliminated (Dr Zenith Ltd ₹8,500), Bank asset decreases by ₹8,000 (Cr Bank ₹8,000), and ₹500 is a nominal income/gain (Cr Discount Received ₹500)."
  },
  {
    id: 5,
    question: "Why must every double-entry transaction have equal Debit and Credit values before saving?",
    options: [
      "To preserve the fundamental equation Assets = Capital + Liabilities and prevent trial balance imbalance",
      "Because computers crash otherwise",
      "Because bank managers forbid unequal numbers",
      "Because the government only allows even numbers"
    ],
    answer: "To preserve the fundamental equation Assets = Capital + Liabilities and prevent trial balance imbalance",
    explanation: "Equality of total debits and credits maintains the mathematical integrity of the accounting equation and ensures the Trial Balance always agrees."
  }
];
