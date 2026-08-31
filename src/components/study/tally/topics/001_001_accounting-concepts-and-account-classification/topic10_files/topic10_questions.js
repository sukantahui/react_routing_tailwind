export default [
  {
    id: 1,
    question: "When a sole proprietor introduces ₹5,00,000 cash to commence business, what is the journal entry and corresponding TallyPrime voucher?",
    options: [
      "Debit Cash A/c ₹5,00,000 | Credit Capital A/c ₹5,00,000 | Voucher: F6 Receipt",
      "Debit Capital A/c ₹5,00,000 | Credit Cash A/c ₹5,00,000 | Voucher: F5 Payment",
      "Debit Purchase A/c ₹5,00,000 | Credit Cash A/c ₹5,00,000 | Voucher: F9 Purchase",
      "Debit Bank A/c ₹5,00,000 | Credit Sales A/c ₹5,00,000 | Voucher: F8 Sales"
    ],
    answer: "Debit Cash A/c ₹5,00,000 | Credit Capital A/c ₹5,00,000 | Voucher: F6 Receipt",
    explanation: "Cash is coming into the business asset pool (Debit Cash). Capital is the owner's claim being credited. Since money is entering the enterprise, it is recorded in F6 Receipt."
  },
  {
    id: 2,
    question: "When goods worth ₹80,000 are purchased from supplier HP Supplies Ltd on credit, what entry is passed in TallyPrime?",
    options: [
      "Debit Purchase A/c ₹80,000 | Credit HP Supplies Ltd A/c ₹80,000 in F9 Purchase",
      "Debit HP Supplies Ltd A/c ₹80,000 | Credit Purchase A/c ₹80,000 in F8 Sales",
      "Debit Cash A/c ₹80,000 | Credit Purchase A/c ₹80,000 in F5 Payment",
      "Debit Purchase A/c ₹80,000 | Credit Sales A/c ₹80,000 in F4 Contra"
    ],
    answer: "Debit Purchase A/c ₹80,000 | Credit HP Supplies Ltd A/c ₹80,000 in F9 Purchase",
    explanation: "Purchase is an expense/asset category debited (+), while HP Supplies Ltd is a Sundry Creditor liability credited (+), entered in F9 Purchase voucher."
  },
  {
    id: 3,
    question: "When goods are sold to Sohini Traders on credit for ₹60,000, what is the accounting entry?",
    options: [
      "Debit Sohini Traders (Sundry Debtor) ₹60,000 | Credit Sales A/c ₹60,000 in F8 Sales",
      "Debit Sales A/c ₹60,000 | Credit Sohini Traders ₹60,000 in F9 Purchase",
      "Debit Cash A/c ₹60,000 | Credit Capital A/c ₹60,000 in F6 Receipt",
      "Debit Bank A/c ₹60,000 | Credit Sohini Traders ₹60,000 in F5 Payment"
    ],
    answer: "Debit Sohini Traders (Sundry Debtor) ₹60,000 | Credit Sales A/c ₹60,000 in F8 Sales",
    explanation: "Sohini Traders becomes a Sundry Debtor (Asset increase - Debit), and Sales is operating revenue (Income increase - Credit) recorded under F8 Sales."
  },
  {
    id: 4,
    question: "When the owner withdraws ₹5,000 worth of trading goods from the business for personal family consumption, how is this recorded?",
    options: [
      "Debit Drawings A/c ₹5,00,0 | Credit Purchase A/c ₹5,000 (Voucher: F7 Journal)",
      "Debit Sales A/c ₹5,000 | Credit Cash A/c ₹5,000 (Voucher: F8 Sales)",
      "Debit Office Expense A/c ₹5,000 | Credit Stock A/c ₹5,000 (Voucher: F5 Payment)",
      "No entry is made because the goods belong to the owner"
    ],
    answer: "Debit Drawings A/c ₹5,00,0 | Credit Purchase A/c ₹5,000 (Voucher: F7 Journal)",
    explanation: "Drawings is debited at cost price, and Purchase A/c is credited to reduce the original cost of goods available for sale. Since no money changes hands, it is passed in F7 Journal."
  },
  {
    id: 5,
    question: "When paying staff salaries of ₹25,000 by HDFC Bank cheque, which voucher type is selected in TallyPrime?",
    options: [
      "F5 Payment",
      "F6 Receipt",
      "F4 Contra",
      "F9 Purchase"
    ],
    answer: "F5 Payment",
    explanation: "Any outward disbursement of funds (whether via physical cash or banking channels like Cheque, NEFT, RTGS) is recorded under F5 Payment."
  }
];
