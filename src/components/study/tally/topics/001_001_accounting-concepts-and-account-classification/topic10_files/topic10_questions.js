export default [
  {
    id: 1,
    question: "When a sole proprietor introduces ₹10,00,000 cash to start a business, what is the complete journal entry and Tally voucher type?",
    options: [
      "F6 Receipt Voucher; Debit Cash A/c ₹10,00,000; Credit Capital A/c ₹10,00,000",
      "F5 Payment Voucher; Debit Capital A/c; Credit Cash A/c",
      "F7 Journal Voucher; Debit Sales A/c; Credit Capital A/c",
      "F4 Contra Voucher; Debit Bank A/c; Credit Cash A/c"
    ],
    answer: "F6 Receipt Voucher; Debit Cash A/c ₹10,00,000; Credit Capital A/c ₹10,00,000",
    explanation: "Cash received as capital is recorded in F6 Receipt Voucher: Debit Cash asset, Credit Capital owner's equity."
  },
  {
    id: 2,
    question: "When purchasing inventory goods for cash ₹40,000, what is the correct voucher type and entry in TallyPrime?",
    options: [
      "F9 Purchase Voucher (or F5 Payment); Debit Purchase A/c ₹40,000; Credit Cash A/c ₹40,000",
      "F8 Sales Voucher; Debit Cash A/c; Credit Purchase A/c",
      "F4 Contra Voucher; Debit Stock A/c; Credit Cash A/c",
      "F7 Journal Voucher; Debit Capital A/c; Credit Cash A/c"
    ],
    answer: "F9 Purchase Voucher (or F5 Payment); Debit Purchase A/c ₹40,000; Credit Cash A/c ₹40,000",
    explanation: "Buying inventory for cash is recorded in F9 Purchase / F5 Payment voucher: Debit Purchase expense, Credit Cash asset."
  },
  {
    id: 3,
    question: "When purchasing goods on credit worth ₹1,50,000 from vendor 'National Traders', what is the entry in F9 Purchase Voucher?",
    options: [
      "Debit Purchase A/c ₹1,50,000; Credit National Traders (Sundry Creditor) A/c ₹1,50,000",
      "Debit Cash A/c ₹1,50,000; Credit Purchase A/c ₹1,50,000",
      "Debit National Traders A/c ₹1,50,000; Credit Sales A/c ₹1,50,000",
      "Debit Capital A/c ₹1,50,000; Credit National Traders A/c ₹1,50,000"
    ],
    answer: "Debit Purchase A/c ₹1,50,000; Credit National Traders (Sundry Creditor) A/c ₹1,50,000",
    explanation: "Credit purchase of goods is recorded in F9 Purchase voucher: Debit Purchase account, Credit vendor Sundry Creditor."
  },
  {
    id: 4,
    question: "When selling goods for cash ₹65,000, what is the voucher type and entry in TallyPrime?",
    options: [
      "F8 Sales Voucher (or F6 Receipt); Debit Cash A/c ₹65,000; Credit Sales A/c ₹65,000",
      "F5 Payment Voucher; Debit Sales A/c; Credit Cash A/c",
      "F7 Journal Voucher; Debit Stock A/c; Credit Cash A/c",
      "F4 Contra Voucher; Debit Bank A/c; Credit Sales A/c"
    ],
    answer: "F8 Sales Voucher (or F6 Receipt); Debit Cash A/c ₹65,000; Credit Sales A/c ₹65,000",
    explanation: "Selling goods for cash is recorded in F8 Sales (or F6 Receipt): Debit Cash asset, Credit Sales revenue."
  },
  {
    id: 5,
    question: "When selling goods on credit worth ₹2,20,000 to customer 'Apex Solutions', what is the entry in F8 Sales Voucher?",
    options: [
      "Debit Apex Solutions (Sundry Debtor) A/c ₹2,20,000; Credit Sales A/c ₹2,20,000",
      "Debit Sales A/c ₹2,20,000; Credit Apex Solutions A/c ₹2,20,000",
      "Debit Cash A/c ₹2,20,000; Credit Apex Solutions A/c ₹2,20,000",
      "Debit Purchase A/c ₹2,20,000; Credit Apex Solutions A/c ₹2,20,000"
    ],
    answer: "Debit Apex Solutions (Sundry Debtor) A/c ₹2,20,000; Credit Sales A/c ₹2,20,000",
    explanation: "Credit sales to customer is recorded in F8 Sales voucher: Debit customer Sundry Debtor account, Credit Sales turnover."
  },
  {
    id: 6,
    question: "When paying monthly office rent ₹25,000 by cheque, what is the voucher type and entry?",
    options: [
      "F5 Payment Voucher; Debit Rent Expense A/c ₹25,000; Credit Bank A/c ₹25,000",
      "F6 Receipt Voucher; Debit Bank A/c; Credit Rent A/c",
      "F4 Contra Voucher; Debit Cash A/c; Credit Bank A/c",
      "F7 Journal Voucher; Debit Capital A/c; Credit Rent A/c"
    ],
    answer: "F5 Payment Voucher; Debit Rent Expense A/c ₹25,000; Credit Bank A/c ₹25,000",
    explanation: "Rent payment via bank is recorded in F5 Payment voucher: Debit Rent Expense, Credit Bank."
  },
  {
    id: 7,
    question: "When receiving interest income ₹15,000 directly into the bank account, what is the entry in F6 Receipt Voucher?",
    options: [
      "Debit Bank A/c ₹15,000; Credit Bank Interest Received A/c ₹15,000",
      "Debit Interest Received A/c ₹15,000; Credit Bank A/c ₹15,000",
      "Debit Cash A/c ₹15,000; Credit Capital A/c ₹15,000",
      "Debit Sales A/c ₹15,000; Credit Bank A/c ₹15,000"
    ],
    answer: "Debit Bank A/c ₹15,000; Credit Bank Interest Received A/c ₹15,000",
    explanation: "Bank interest received is recorded in F6 Receipt voucher: Debit Bank asset, Credit Interest Received income."
  },
  {
    id: 8,
    question: "When the proprietor withdraws ₹20,000 cash from the firm for personal domestic use, what is the entry?",
    options: [
      "Debit Drawings A/c ₹20,000; Credit Cash A/c ₹20,000",
      "Debit Cash A/c ₹20,000; Credit Drawings A/c ₹20,000",
      "Debit General Expenses A/c ₹20,000; Credit Bank A/c ₹20,000",
      "Debit Capital A/c ₹20,000; Credit Sales A/c ₹20,000"
    ],
    answer: "Debit Drawings A/c ₹20,000; Credit Cash A/c ₹20,000",
    explanation: "Cash taken for personal use is recorded in F5 Payment / F7 Journal: Debit Drawings, Credit Cash."
  },
  {
    id: 9,
    question: "When proprietor introduces an additional personal motor car valued at ₹3,50,000 into business, what is the entry?",
    options: [
      "Debit Motor Car A/c (Fixed Asset) ₹3,50,000; Credit Capital A/c ₹3,50,000",
      "Debit Capital A/c ₹3,50,000; Credit Motor Car A/c ₹3,50,000",
      "Debit Cash A/c ₹3,50,000; Credit Sales A/c ₹3,50,000",
      "Debit Vehicle Expense A/c ₹3,50,000; Credit Bank A/c ₹3,50,000"
    ],
    answer: "Debit Motor Car A/c (Fixed Asset) ₹3,50,000; Credit Capital A/c ₹3,50,000",
    explanation: "Bringing personal fixed assets into business increases Motor Car asset and increases owner's Capital equity."
  },
  {
    id: 10,
    question: "When paying trade vendor 'National Traders' ₹1,50,000 by bank NEFT transfer, what is the entry?",
    options: [
      "F5 Payment Voucher; Debit National Traders A/c ₹1,50,000; Credit Bank A/c ₹1,50,000",
      "F6 Receipt Voucher; Debit Bank A/c; Credit National Traders",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F8 Sales Voucher; Debit National Traders; Credit Sales"
    ],
    answer: "F5 Payment Voucher; Debit National Traders A/c ₹1,50,000; Credit Bank A/c ₹1,50,000",
    explanation: "Settling vendor bill via bank is recorded in F5 Payment voucher: Debit Creditor, Credit Bank."
  },
  {
    id: 11,
    question: "When collecting ₹2,20,000 cash/cheque from customer 'Apex Solutions', what is the entry?",
    options: [
      "F6 Receipt Voucher; Debit Bank/Cash A/c ₹2,20,000; Credit Apex Solutions A/c ₹2,20,000",
      "F5 Payment Voucher; Debit Apex Solutions; Credit Bank",
      "F7 Journal Voucher; Debit Sales; Credit Apex Solutions",
      "F4 Contra Voucher; Debit Cash; Credit Bank"
    ],
    answer: "F6 Receipt Voucher; Debit Bank/Cash A/c ₹2,20,000; Credit Apex Solutions A/c ₹2,20,000",
    explanation: "Customer receipt is recorded in F6 Receipt voucher: Debit Cash/Bank, Credit Debtor."
  },
  {
    id: 12,
    question: "What is the entry for returning damaged goods worth ₹12,000 to vendor 'National Traders'?",
    options: [
      "Debit Note Voucher; Debit National Traders A/c ₹12,000; Credit Return Outward A/c ₹12,000",
      "Credit Note Voucher; Debit Purchase Return; Credit National Traders",
      "Payment Voucher; Debit Cash; Credit Purchase Return",
      "Journal Voucher; Debit Sales Return; Credit Cash"
    ],
    answer: "Debit Note Voucher; Debit National Traders A/c ₹12,000; Credit Return Outward A/c ₹12,000",
    explanation: "Goods returned to vendor are recorded via Debit Note: Debit Creditor (reducing liability), Credit Purchase Return."
  },
  {
    id: 13,
    question: "What is the entry when customer 'Apex Solutions' returns goods worth ₹8,000?",
    options: [
      "Credit Note Voucher; Debit Return Inward A/c ₹8,000; Credit Apex Solutions A/c ₹8,000",
      "Debit Note Voucher; Debit Apex Solutions; Credit Sales Return",
      "Receipt Voucher; Debit Cash; Credit Sales Return",
      "Journal Voucher; Debit Purchase Return; Credit Cash"
    ],
    answer: "Credit Note Voucher; Debit Return Inward A/c ₹8,000; Credit Apex Solutions A/c ₹8,000",
    explanation: "Goods returned by customer are recorded via Credit Note: Debit Return Inward (reducing revenue), Credit Debtor."
  },
  {
    id: 14,
    question: "Paid office tea and refreshment expenses ₹1,200 cash. What is the entry?",
    options: [
      "F5 Payment Voucher; Debit Office Expenses / Refreshment A/c ₹1,200; Credit Cash A/c ₹1,200",
      "F6 Receipt Voucher; Debit Cash; Credit Refreshment",
      "F4 Contra Voucher; Debit Refreshment; Credit Bank",
      "F7 Journal; Debit Capital; Credit Cash"
    ],
    answer: "F5 Payment Voucher; Debit Office Expenses / Refreshment A/c ₹1,200; Credit Cash A/c ₹1,200",
    explanation: "Routine office expenses paid in cash are recorded in F5 Payment: Debit Office Expense, Credit Cash."
  },
  {
    id: 15,
    question: "Paid annual office building insurance premium ₹36,000 by cheque. What is the entry?",
    options: [
      "F5 Payment Voucher; Debit Insurance Premium A/c ₹36,000; Credit Bank A/c ₹36,000",
      "F6 Receipt Voucher; Debit Bank; Credit Insurance",
      "F4 Contra; Debit Cash; Credit Bank",
      "F7 Journal; Debit Capital; Credit Bank"
    ],
    answer: "F5 Payment Voucher; Debit Insurance Premium A/c ₹36,000; Credit Bank A/c ₹36,000",
    explanation: "Insurance premium payment is recorded in F5 Payment voucher: Debit Insurance Premium, Credit Bank."
  },
  {
    id: 16,
    question: "Received rent income ₹18,000 cash for subletting part of office premises. What is the entry?",
    options: [
      "F6 Receipt Voucher; Debit Cash A/c ₹18,000; Credit Rent Received A/c ₹18,000",
      "F5 Payment Voucher; Debit Rent Received; Credit Cash",
      "F7 Journal Voucher; Debit Rent Expense; Credit Cash",
      "F4 Contra Voucher; Debit Bank; Credit Cash"
    ],
    answer: "F6 Receipt Voucher; Debit Cash A/c ₹18,000; Credit Rent Received A/c ₹18,000",
    explanation: "Subletting rent received is non-operating income recorded in F6 Receipt: Debit Cash, Credit Rent Received."
  },
  {
    id: 17,
    question: "Purchased shop air conditioner for ₹42,000 cash. What is the entry?",
    options: [
      "F5 Payment / F7 Journal; Debit Office Equipment A/c ₹42,000; Credit Cash A/c ₹42,000",
      "F9 Purchase Voucher; Debit Purchase A/c; Credit Cash A/c",
      "F8 Sales Voucher; Debit Cash A/c; Credit Sales A/c",
      "F4 Contra Voucher; Debit Equipment A/c; Credit Bank A/c"
    ],
    answer: "F5 Payment / F7 Journal; Debit Office Equipment A/c ₹42,000; Credit Cash A/c ₹42,000",
    explanation: "Purchasing a capital equipment asset is debited to Office Equipment asset account, not Purchase account."
  },
  {
    id: 18,
    question: "Sold old computer scrap for ₹3,500 cash. What is the entry?",
    options: [
      "F6 Receipt Voucher; Debit Cash A/c ₹3,500; Credit Scrap Sales / Other Income A/c ₹3,500",
      "F8 Sales Voucher; Debit Computer A/c; Credit Cash A/c",
      "F5 Payment Voucher; Debit Cash A/c; Credit Computer A/c",
      "F4 Contra Voucher; Debit Bank; Credit Cash"
    ],
    answer: "F6 Receipt Voucher; Debit Cash A/c ₹3,500; Credit Scrap Sales / Other Income A/c ₹3,500",
    explanation: "Sale of office scrap is recorded in F6 Receipt voucher: Debit Cash asset, Credit Scrap Sales revenue."
  },
  {
    id: 19,
    question: "Paid electricity bill ₹9,500 and phone bill ₹3,200 by bank auto-debit. What is the entry?",
    options: [
      "F5 Payment Voucher; Debit Electricity A/c ₹9,500, Debit Telephone A/c ₹3,200; Credit Bank A/c ₹12,700",
      "F6 Receipt Voucher; Debit Bank; Credit Expenses",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F7 Journal; Debit Capital; Credit Bank"
    ],
    answer: "F5 Payment Voucher; Debit Electricity A/c ₹9,500, Debit Telephone A/c ₹3,200; Credit Bank A/c ₹12,700",
    explanation: "Compound utility payment debits Electricity (₹9,500) and Telephone (₹3,200), crediting Bank (₹12,700)."
  },
  {
    id: 20,
    question: "Owner paid child's school fees ₹15,000 using business bank cheque. What is the entry?",
    options: [
      "F5 Payment Voucher; Debit Drawings A/c ₹15,000; Credit Bank A/c ₹15,000",
      "F5 Payment Voucher; Debit Education Expenses A/c; Credit Bank A/c",
      "F6 Receipt Voucher; Debit Bank; Credit Capital",
      "F7 Journal Voucher; Debit General Expenses; Credit Cash"
    ],
    answer: "F5 Payment Voucher; Debit Drawings A/c ₹15,000; Credit Bank A/c ₹15,000",
    explanation: "Owner's personal expenses paid from business bank account must be debited to Drawings, not business expense."
  },
  {
    id: 21,
    question: "Bank credited ₹600 as interest on savings account. What is the entry?",
    options: [
      "F6 Receipt Voucher; Debit Bank A/c ₹600; Credit Bank Interest Received A/c ₹600",
      "F5 Payment Voucher; Debit Interest Received; Credit Bank",
      "F4 Contra Voucher; Debit Cash; Credit Bank",
      "F7 Journal Voucher; Debit Capital; Credit Bank"
    ],
    answer: "F6 Receipt Voucher; Debit Bank A/c ₹600; Credit Bank Interest Received A/c ₹600",
    explanation: "Bank interest earned increases bank balance: Debit Bank asset, Credit Interest Received income."
  },
  {
    id: 22,
    question: "Charged monthly depreciation ₹5,000 on office building. What is the entry?",
    options: [
      "F7 Journal Voucher; Debit Depreciation Expense A/c ₹5,000; Credit Office Building A/c ₹5,000",
      "F5 Payment Voucher; Debit Cash; Credit Building",
      "F6 Receipt Voucher; Debit Building; Credit Depreciation",
      "F4 Contra Voucher; Debit Bank; Credit Building"
    ],
    answer: "F7 Journal Voucher; Debit Depreciation Expense A/c ₹5,000; Credit Office Building A/c ₹5,000",
    explanation: "Non-cash adjusting depreciation entry is recorded in F7 Journal: Debit Depreciation Expense, Credit Building."
  },
  {
    id: 23,
    question: "Customer 'Ramesh Kumar' paid ₹18,000 directly into business bank account via UPI. What is the entry?",
    options: [
      "F6 Receipt Voucher; Debit Bank A/c ₹18,000; Credit Ramesh Kumar (Sundry Debtor) A/c ₹18,000",
      "F5 Payment Voucher; Debit Ramesh Kumar; Credit Bank",
      "F8 Sales Voucher; Debit Sales; Credit Bank",
      "F4 Contra Voucher; Debit Cash; Credit Bank"
    ],
    answer: "F6 Receipt Voucher; Debit Bank A/c ₹18,000; Credit Ramesh Kumar (Sundry Debtor) A/c ₹18,000",
    explanation: "Direct digital UPI receipt from customer is recorded in F6 Receipt: Debit Bank, Credit Debtor."
  },
  {
    id: 24,
    question: "Paid ₹500 cash for office cleaning and sanitation. What is the entry?",
    options: [
      "F5 Payment Voucher; Debit Cleaning & Sanitation Expense A/c ₹500; Credit Cash A/c ₹500",
      "F6 Receipt Voucher; Debit Cash; Credit Cleaning",
      "F7 Journal; Debit Capital; Credit Cash",
      "F4 Contra; Debit Bank; Credit Cash"
    ],
    answer: "F5 Payment Voucher; Debit Cleaning & Sanitation Expense A/c ₹500; Credit Cash A/c ₹500",
    explanation: "Small office maintenance expense is recorded in F5 Payment: Debit Cleaning Expense, Credit Cash."
  },
  {
    id: 25,
    question: "Why is mastering practical transaction illustrations crucial for non-accounting students before creating vouchers in TallyPrime?",
    options: [
      "Because real commercial bookkeeping involves mapping real-world business scenarios directly to standard accounting voucher types and debit-credit entries without hesitation",
      "Because TallyPrime does not allow voucher editing",
      "Because voucher entries cannot be printed",
      "Because practical illustrations replace the need for bank accounts"
    ],
    answer: "Because real commercial bookkeeping involves mapping real-world business scenarios directly to standard accounting voucher types and debit-credit entries without hesitation",
    explanation: "Working through comprehensive practical transaction illustrations builds the muscle memory required to handle daily bookkeeping in TallyPrime efficiently."
  }
];
