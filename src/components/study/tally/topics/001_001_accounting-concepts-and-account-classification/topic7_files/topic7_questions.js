export default [
  {
    id: 1,
    question: "When a firm receives a cash payment of ₹18,000 from customer Rohit Roy, what is the Golden Rule analysis?",
    options: [
      "Debit Rohit Roy (Personal), Credit Cash (Real)",
      "Debit Cash A/c (Real - What Comes In), Credit Rohit Roy A/c (Personal - The Giver)",
      "Debit Sales A/c, Credit Cash A/c",
      "Debit Cash A/c, Credit Discount A/c"
    ],
    answer: "Debit Cash A/c (Real - What Comes In), Credit Rohit Roy A/c (Personal - The Giver)",
    explanation: "Cash is a Real Asset entering the firm (Debit what comes in). Rohit Roy is a Personal Account giving the funds (Credit the giver)."
  },
  {
    id: 2,
    question: "Which of the following journal entries correctly applies the Nominal Account Golden Rule when paying ₹20,000 shop rent via bank transfer?",
    options: [
      "Debit Bank A/c ₹20,000 | Credit Rent A/c ₹20,000",
      "Debit Rent Expense A/c (Nominal - Expense) ₹20,000 | Credit Bank A/c (Personal - Giver) ₹20,000",
      "Debit Landlord Personal A/c ₹20,000 | Credit Cash A/c ₹20,000",
      "Debit Capital A/c ₹20,000 | Credit Rent A/c ₹20,000"
    ],
    answer: "Debit Rent Expense A/c (Nominal - Expense) ₹20,000 | Credit Bank A/c (Personal - Giver) ₹20,000",
    explanation: "Rent is a Nominal Expense (Debit all expenses & losses). Bank is a Personal Account delivering the funds on our behalf (Credit the giver)."
  },
  {
    id: 3,
    question: "Under the Golden Rules, what is the debit/credit treatment for purchasing office furniture for ₹30,000 cash?",
    options: [
      "Debit Furniture A/c (Real - Comes In) | Credit Cash A/c (Real - Goes Out)",
      "Debit Purchase A/c | Credit Cash A/c",
      "Debit Cash A/c | Credit Furniture A/c",
      "Debit Furniture A/c | Credit Capital A/c"
    ],
    answer: "Debit Furniture A/c (Real - Comes In) | Credit Cash A/c (Real - Goes Out)",
    explanation: "Both Furniture and Cash are Real Accounts. Furniture comes into the office (Debit), and Cash leaves the till (Credit)."
  },
  {
    id: 4,
    question: "When goods are sold to customer Priya on credit for ₹12,000, which accounts are debited and credited?",
    options: [
      "Debit Cash A/c | Credit Sales A/c",
      "Debit Priya A/c (Personal - Receiver) | Credit Sales A/c (Nominal - Income)",
      "Debit Sales A/c | Credit Priya A/c",
      "Debit Priya A/c | Credit Cash A/c"
    ],
    answer: "Debit Priya A/c (Personal - Receiver) | Credit Sales A/c (Nominal - Income)",
    explanation: "Priya is the Personal receiver of the goods (Debit the receiver). Sales is a Nominal Account representing operating revenue (Credit all incomes & gains)."
  },
  {
    id: 5,
    question: "In TallyPrime, which configuration switch changes 'To/By' into 'Cr/Dr' inside the voucher entry screen?",
    options: [
      "F12 Configuration > 'Use Cr/Dr instead of To/By during voucher entry'",
      "Alt + F2 Date Change",
      "Ctrl + F3 Change Company",
      "Alt + F1 Detailed Format"
    ],
    answer: "F12 Configuration > 'Use Cr/Dr instead of To/By during voucher entry'",
    explanation: "Pressing F12 within any voucher entry screen in TallyPrime provides the toggle to switch legacy 'To/By' into modern 'Dr/Cr' terminology."
  }
];
