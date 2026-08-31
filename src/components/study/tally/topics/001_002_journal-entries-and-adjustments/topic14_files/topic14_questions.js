const questionsEn = [
  {
    id: 1,
    question: "When proprietor introduces cash capital ₹6,00,000 and office furniture ₹50,000 to commence business, what compound entry is passed?",
    options: [
      "Debit Capital A/c ₹6,50,000; Credit Cash A/c ₹6,00,000, Credit Furniture A/c ₹50,000",
      "Debit Cash A/c ₹6,00,000, Debit Furniture A/c ₹50,000; Credit Capital A/c ₹6,50,000",
      "Debit Drawings A/c ₹6,50,000; Credit Bank A/c ₹6,50,000",
      "Debit Purchases A/c ₹6,50,000; Credit Creditors A/c ₹6,50,000"
    ],
    answerIndex: 1,
    explanation: "Under compound entry principles, both incoming assets (Cash ₹6,00,000 and Furniture ₹50,000) are debited and the owner's Capital liability is credited with ₹6,50,000."
  },
  {
    id: 2,
    question: "In TallyPrime, which voucher type is used to record inventory purchase of ₹1,20,000 on credit terms from a vendor?",
    options: [
      "F5 Payment Voucher",
      "F6 Receipt Voucher",
      "F9 Purchase Voucher",
      "F8 Sales Voucher"
    ],
    answerIndex: 2,
    explanation: "F9 Purchase Voucher is used to record stock/inventory purchases from suppliers on credit or cash terms."
  },
  {
    id: 3,
    question: "When returning defective goods worth ₹15,000 to a trade supplier, what document is issued and which account is credited?",
    options: [
      "Credit Note issued; Credit Return Inward Account",
      "Debit Note issued; Credit Return Outward Account (or Purchases A/c)",
      "Cash Receipt issued; Credit Bank A/c",
      "Delivery Note issued; Credit Capital A/c"
    ],
    answerIndex: 1,
    explanation: "A Debit Note is issued to debit the supplier's account (reducing trade payable liability) while crediting Return Outward Account."
  },
  {
    id: 4,
    question: "When a credit customer returns damaged goods worth ₹10,000, what entry is passed in the accounting books?",
    options: [
      "Debit Return Inward A/c ₹10,000; Credit Customer (Sundry Debtor) A/c ₹10,00,0",
      "Debit Customer A/c ₹10,000; Credit Return Inward A/c ₹10,00,0",
      "Debit Cash A/c ₹10,000; Credit Purchase A/c ₹10,000",
      "Debit Capital A/c ₹10,000; Credit Drawings A/c ₹10,000"
    ],
    answerIndex: 0,
    explanation: "Return Inward A/c is debited (reducing revenue) and Customer (Sundry Debtor) A/c is credited (reducing trade receivable)."
  },
  {
    id: 5,
    question: "What function key shortcut opens the Journal Voucher (F7) in TallyPrime for non-cash debit/credit note adjustments?",
    options: [
      "F4",
      "F5",
      "F7",
      "F8"
    ],
    answerIndex: 2,
    explanation: "F7 opens the Journal Voucher in TallyPrime for non-cash adjustment entries, debit notes, credit notes, and provisions."
  }
];

export default questionsEn;
